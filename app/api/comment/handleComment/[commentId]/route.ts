import client from "@/app/lib/client";
import { gql } from "graphql-request";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { commentId: string } }
) {
  const mutation = gql`
    mutation MyMutation($id: ID!) {
      deleteComment(where: { id: $id }) {
        id
      }
    }
  `;

  try {
    const response = await client.request(mutation, { id: params.commentId });
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

export async function PATCH(
  req: NextRequest,
  { params }: { params: { commentId: string } }
) {
  const { comment } = await req.json();
  const mutation = gql`
    mutation MyMutation($id: ID!, $comment: String!) {
      updateComment(where: { id: $id }, data: { comment: $comment }) {
        id
      }
      publishComment(where: { id: $id }) {
        id
      }
    }
  `;
  const response: any = await client.request(mutation, {
    id: params.commentId,
    comment: comment,
  });

  return NextResponse.json({ message: "success", status: 200 });
}
