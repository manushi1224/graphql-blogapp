import { authOptions } from "@/app/lib/auth";
import { GetUserByEmail } from "@/services";
import { GraphQLClient, gql } from "graphql-request";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const customGraphToken = process.env.NEXT_PUBLIC_HYGRAPH_TOKEN;

const client = new GraphQLClient(graphqlAPI as string, {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${customGraphToken}`,
  },
});

const getPostByUserId = gql`
  query getPostByUserId($id: ID!) {
    postsConnection(where: { author: { id: $id } }) {
      edges {
        node {
          author {
            name
          }
          category {
            category
          }
          coverImage {
            url
          }
          excerpt
          slug
          title
          createdAt
        }
      }
    }
  }
`;

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const { user } = await GetUserByEmail(session?.user?.email as string);

  try {
    const getUserResponse: any = await client.request(getPostByUserId, {
      id: user?.id,
    });
    return NextResponse.json({ posts: getUserResponse.postsConnection.edges });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
