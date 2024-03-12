import client from "@/app/lib/client";
import { gql } from "graphql-request";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { title_like: string } }
) {
  const { title_like } = params;
  const query = gql`
    query MyQuery($id: String) {
      postsConnection(where: { title_contains: $id }) {
        edges {
          node {
            title
            category {
              category
            }
            author {
              name
            }
            content {
              text
            }
            coverImage {
              url
            }
            slug
            createdAt
          }
        }
      }
    }
  `;

  try {
    const response: any = await client.request(query, {
      id: title_like,
    });
    return NextResponse.json(response.postsConnection.edges);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}
