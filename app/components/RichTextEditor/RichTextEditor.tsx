"use client";
import React from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function RichTextEditor({
  editorRef,
  content,
  editMode,
  handleEditorChange,
}: any) {
  return (
    <>
      <div className="w-full">
        <Editor
          id="tinyMCE"
          scriptLoading={{ async: true }}
          initialValue={editMode ? content : ""}
          onEditorChange={(event) => {
            handleEditorChange(event);
          }}
          apiKey={process.env.NEXT_PUBLIC_RICH_TEXT_API}
          onInit={(evt, editor) => (editorRef.current = editor)}
          init={{
            height: 450,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "codesample",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "media",
              "wordcount",
              "emoticons",
            ],
            toolbar:
              "undo redo | blocks emoticons | " +
              "bold italic blockquote link codesample |" +
              "bullist numlist outdent indent | " +
              "removeformat | help  code",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
      </div>
    </>
  );
}
