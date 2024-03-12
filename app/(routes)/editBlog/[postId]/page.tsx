import RichTextEditor from "@/app/components/RichTextEditor/RichTextEditor";
import React from "react";

async function getPostData(postId: string) {
  const response: any = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/blog/getBlog/${postId}`,
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
      <RichTextEditor editMode={true} postId={id} postData={post[0]?.node} />
    </div>
  );
}

export default Page;
