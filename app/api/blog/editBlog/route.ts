import client from "@/app/lib/client";
import { deleteAsset } from "@/app/lib/deleteAsset";
import { publishAsset, publishPost } from "@/app/lib/publishControllers";
import { uploadAsset } from "@/app/lib/uploadAsset";
import { getCategoryByName } from "@/services";
import htmlToSlateAST from "@graphcms/html-to-slate-ast";
import { gql } from "graphql-request";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const fileUpload = data.get("file");
  let image_id: any;
  if (fileUpload !== undefined) {
    const form: any = new FormData();
    form.append("fileUpload", fileUpload);
    image_id = await uploadAsset(form);
    if (image_id) {
      await deleteAsset(data.get("image_id") as string);
    }
  }
  image_id = image_id || data.get("image_id");
  await publishAsset(image_id);

  const { categories } = await getCategoryByName(
    data.get("category") as string
  );
  const ast = await htmlToSlateAST(data.get("description") as string);

  const blogData = {
    title: data.get("title"),
    category: categories?.id,
    content: { children: ast },
    slug: data.get("slug"),
    excerpt: data.get("excerpt"),
    featuredPost: Boolean(data.get("featuredPost")),
    image_id: image_id,
    postId: data.get("postId"),
  };

  const mutation = gql`
    mutation MyMutation(
      $content: RichTextAST!
      $excerpt: String!
      $featuredPost: Boolean!
      $title: String!
      $image_id: ID!
      $postId: ID!
      $category: ID!
      $slug: String!
    ) {
      updatePost(
        data: {
          content: $content
          excerpt: $excerpt
          featuredPost: $featuredPost
          title: $title
          slug: $slug
          coverImage: { connect: { id: $image_id } }
          category: { connect: { id: $category } }
        }
        where: { id: $postId }
      ) {
        id
      }
    }
  `;

  try {
    const result: any = await client.request(mutation, blogData);
    console.log(result.updatePost.id);
    await publishPost(result.updatePost.id);
    return NextResponse.json({
      message: "Blog updated successfully",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Failed to update the blog",
      status: 500,
    });
  }
}
