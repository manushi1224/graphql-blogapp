import client from "@/app/lib/client";
import { gql } from "graphql-request";
import { NextRequest, NextResponse } from "next/server";

const getPostDataById = gql`
  query MyQuery($id: ID!) {
    postsConnection(where: { id: $id }) {
      edges {
        node {
          category {
            category
            id
          }
          title
          coverImage {
            url
            id
          }
          excerpt
          id
          content {
            text
          }
          featuredPost
        }
      }
    }
  }
`;

export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const { postId } = params;
  const response: any = await client.request(getPostDataById, { id: postId });

  return NextResponse.json({ post: response.postsConnection.edges });
}
