import client from "@/app/lib/client";
import {
  publishAuthor,
  publishLike,
  publishPost,
} from "@/app/lib/publishControllers";
import { GetUserByEmail, getLikesByPostId } from "@/services";
import { gql } from "graphql-request";
import { NextRequest, NextResponse } from "next/server";

const createMutation = gql`
  mutation MyMutation($id: ID!, $postId: ID!) {
    createLike(
      data: {
        author: { connect: { id: $id } }
        posts: { connect: { id: $postId } }
      }
    ) {
      id
    }
  }
`;

const editMutation = gql`
  mutation MyMutation($likeId: ID!, $postId: ID!) {
    updateLike(
      data: { posts: { connect: { where: { id: $postId } } } }
      where: { id: $likeId }
    ) {
      id
    }
    publishLike(where: { id: $likeId }) {
      id
    }
  }
`;

export async function POST(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  console.log(params, "params");
  const postId: any = params.postId;
  const { email } = await req.json();
  const { user } = await GetUserByEmail(email as string);
  const posts = await getLikesByPostId(user.id as string);

  if (posts.length === 0) {
    //createLike logic here
    const response: any = await client.request(createMutation, {
      id: user.id,
      postId: postId,
    });
    if (response.errors) {
      console.log(response.errors, "errors");
    }
    console.log(response, "response");
    await publishLike(response.createLike.id as string);
    await publishAuthor(user.id as string);
    await publishPost(postId as string);
    return NextResponse.json({ message: "success" });
  }

  //logic when you have already liked post

  const ifLiked = posts[0].node.posts.filter((post: any) => post.id === postId);
  console.log(ifLiked, "ifLiked");

  if (ifLiked.length > 0) {
    console.log("Already Liked!");
    return NextResponse.json({ message: "You have already liked this post!" });
  }

  //update like where you connect the post mutation only
  const response: any = await client.request(editMutation, {
    likeId: posts[0].node.id,
    postId: postId,
  });
  if (response.errors) {
    console.log(response.errors, "errors");
    return NextResponse.json({ message: "error" });
  }
  console.log(response.updateLike.id, "response");
  await publishAuthor(user.id as string);
  await publishPost(postId as string);

  return NextResponse.json({ message: "success" });
}
