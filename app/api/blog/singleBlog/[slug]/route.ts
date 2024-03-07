import { validate } from "graphql";
import { GraphQLClient, gql } from "graphql-request";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;
export const dynamic = "force-dynamic";

const { NEXT_PUBLIC_GRAPHCMS_ENDPOINT, NEXT_PUBLIC_HYGRAPH_TOKEN } =
  process.env;
const client = new GraphQLClient(NEXT_PUBLIC_GRAPHCMS_ENDPOINT as string, {
  headers: {
    Authorization: `Bearer ${NEXT_PUBLIC_HYGRAPH_TOKEN}`,
  },
});

const individualPost = gql`
  query MyQuery($slug: String) {
    postsConnection(where: { slug: $slug }) {
      edges {
        node {
          createdAt
          title
          category {
            category
          }
          coverImage {
            url
          }
          author {
            name
            id
          }
          content {
            html
          }
        }
      }
    }
  }
`;

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: String } }
) {
  try {
    const response: any = await client.request(individualPost, {
      slug: params.slug,
    });
    return NextResponse.json(response.postsConnection.edges[0].node);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
