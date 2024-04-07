import { deletePostById } from "@/app/graphql/mutation";
import { getPostDataById } from "@/app/graphql/query";
import client from "@/app/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const { postId } = params;
  const response: any = await client.request(getPostDataById, { id: postId });

  return NextResponse.json({ post: response.postsConnection.edges });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const response = await client.request(deletePostById, {
      id: params.postId,
    });

    return NextResponse.json({
      message: "Post deleted successfully!",
      status: 200,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message, status: 500 });
  }
}
