import client from "@/app/lib/client";
import { gql } from "graphql-request";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const mutation = gql`
    mutation MyMutation($id: ID!) {
      deletePost(where: { id: $id }) {
        id
      }
    }
  `;

  try {
    const response = await client.request(mutation, { id: params.postId });
    console.log(response);

    return NextResponse.json({
      message: "Post deleted successfully!",
      status: 200,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message, status: 500 });
  }
}
