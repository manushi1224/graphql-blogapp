import { GetUserByEmail, getCategoryByName } from "@/services";
import { GraphQLClient, gql } from "graphql-request";
import { NextResponse, NextRequest } from "next/server";
import { htmlToSlateAST } from "@graphcms/html-to-slate-ast";
import { uploadAsset } from "@/app/lib/asssetController";
import { publishAsset, publishPost } from "@/app/lib/publishControllers";
import { createNewPost } from "@/app/graphql/mutation";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const customGraphToken = process.env.NEXT_PUBLIC_HYGRAPH_TOKEN;

const client = new GraphQLClient(graphqlAPI as string, {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${customGraphToken}`,
  },
});

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.formData();
  const fileUpload = data.get("file");
  const form: any = new FormData();
  // console.log(data.get("description") as string);
  form.append("fileUpload", fileUpload);

  const [image_id, user, categories, ast] = await Promise.all([
    uploadAsset(form),
    GetUserByEmail(data.get("author") as string),
    getCategoryByName(data.get("category") as string),
    htmlToSlateAST(data.get("description") as string),
  ]);

  // console.log(JSON.stringify(ast, null, 2));

  const blogData = {
    title: data.get("title"),
    category: categories?.categories.id,
    content: { children: ast },
    slug: data.get("slug"),
    excerpt: data.get("excerpt"),
    featuredPost: Boolean(data.get("featuredPost")),
    author: user?.user.id,
    image_id: image_id,
  };

  try {
    const blogCreated: any = await client.request(createNewPost, blogData);
    if (blogCreated.createPost.id) {
      const [postPublish, asssetPublish] = await Promise.all([
        publishPost(blogCreated.createPost.id),
        publishAsset(image_id),
      ]);
    }
    return NextResponse.json({ message: "Blog Created", status: 201 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      message: error.message,
      status: 500,
      error: error.message,
    });
  }
}
