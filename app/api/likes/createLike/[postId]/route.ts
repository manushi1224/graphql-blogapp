import {
  createLikeByAuthorAndPostId,
  updateAndPublishLike,
} from "@/app/graphql/mutation";
import client from "@/app/lib/client";
import {
  publishAuthor,
  publishLike,
  publishPost,
} from "@/app/lib/publishControllers";
import { GetUserByEmail, getLikesByPostId } from "@/services";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const postId: any = params.postId;
  const { email } = await req.json();
  const { user } = await GetUserByEmail(email as string);
  const posts = await getLikesByPostId(user.id as string);

  if (posts.length === 0) {
    //createLike logic here
    const response: any = await client.request(createLikeByAuthorAndPostId, {
      id: user.id,
      postId: postId,
    });
    if (response.errors) {
      console.log(response.errors, "errors");
    }
    await publishLike(response.createLike.id as string);
    await publishAuthor(user.id as string);
    await publishPost(postId as string);
    return NextResponse.json({ message: "success" });
  }

  //logic when you have already liked post

  const ifLiked = posts[0].node.posts.filter((post: any) => post.id === postId);

  if (ifLiked.length > 0) {
    return NextResponse.json({ message: "You have already liked this post!" });
  }

  //update like where you connect the post mutation only
  const response: any = await client.request(updateAndPublishLike, {
    likeId: posts[0].node.id,
    postId: postId,
  });
  if (response.errors) {
    console.log(response.errors, "errors");
    return NextResponse.json({ message: "error" });
  }
  await publishAuthor(user.id as string);
  await publishPost(postId as string);

  return NextResponse.json({ message: "success" });
}
