import PostForm from "@/app/components/PostForm/PostForm";
import React from "react";

async function getPostData(postId: string) {
  const response: any = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/blog/handleBlog/${postId}`,
    { cache: "no-cache" }
  );
  const post = await response.json();
  return post;
}

async function Page({ params }: any) {
  const id = params.postId;
  const { post } = await getPostData(id);
  console.log(post);
  return (
    <div>
      <PostForm editMode={true} postId={id} postData={post[0]?.node} />
    </div>
  );
}

export default Page;
