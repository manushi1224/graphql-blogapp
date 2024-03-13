import { getPosts } from "@/services";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { category: string } }
) {
  const posts = await getPosts();
  let filteredPosts: any;
  if (posts) {
    filteredPosts = posts.filter(
      (item: any) =>
        item.node.category.category.toLowerCase() === params.category
    );
  }
  return NextResponse.json({ filteredPosts: filteredPosts });
}
