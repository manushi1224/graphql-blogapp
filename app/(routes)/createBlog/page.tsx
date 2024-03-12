import RichTextEditor from "@/app/components/RichTextEditor/RichTextEditor";
import React from "react";

function Page() {
  return (
    <div className="flex justify-center">
      <RichTextEditor editMode={false} />
    </div>
  );
}

export default Page;
