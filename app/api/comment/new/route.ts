import client from "@/app/lib/client";
import {
  publishAuthor,
  publishComment,
  publishPost,
} from "@/app/lib/publishControllers";
import { GetUserByEmail } from "@/services";
import { gql } from "graphql-request";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.formData();

  const { user } = await GetUserByEmail(data.get("email") as string);
  if (user) {
    console.log(user.id);
    const mutation = gql`
      mutation MyMutation($comment: String!, $id: ID!, $slug: String!) {
        createComment(
          data: {
            comment: $comment
            authors: { connect: { id: $id } }
            post: { connect: { slug: $slug } }
          }
        ) {
          id
          post {
            id
            author {
              id
            }
          }
        }
      }
    `;

    const comments = {
      comment: data.get("comment"),
      id: user.id,
      slug: data.get("slug"),
    };

    try {
      const response: any = await client.request(mutation, comments);
      await publishComment(response.createComment.id);
      await publishAuthor(user.id);
      await publishPost(response.createComment.post.id);
      console.log(response);
      return NextResponse.json({ message: "success" });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: "error" });
    }
  }
}
