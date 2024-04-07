import {
  deleteCommentById,
  updateAndPublishComment,
} from "@/app/graphql/mutation";
import client from "@/app/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { commentId: string } }
) {
  try {
    const response = await client.request(deleteCommentById, {
      id: params.commentId,
    });
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
  const response: any = await client.request(updateAndPublishComment, {
    id: params.commentId,
    comment: comment,
  });

  return NextResponse.json({ message: "success", status: 200 });
}
