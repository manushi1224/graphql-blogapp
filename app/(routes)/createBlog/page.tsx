import PostForm from "@/app/components/PostForm/PostForm";
import React from "react";

function Page() {
  return (
    <div className="flex justify-center">
      <PostForm editMode={false} />
    </div>
  );
}

export default Page;
