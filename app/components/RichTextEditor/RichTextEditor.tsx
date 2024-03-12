"use client";
import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

export default function RichTextEditor({
  editMode,
  postId,
  postData,
}: {
  editMode: boolean;
  postId?: string;
  postData?: any;
}) {
  const { data: session } = useSession();
  const editorRef = useRef<any>(null);
  const router = useRouter();
  const [formData, setFormData] = useState<any>({
    title: postData?.title || "",
    category: postData?.category?.category,
    excerpt: postData?.excerpt || "",
    content: postData?.content?.text,
    image: postData?.coverImage.url,
  });
  const [selectedFile, setSelectedFile] = useState<File>();
  const [featuredPost, setFeaturedPost] = useState<boolean>(
    postData?.featuredPost || false
  );
  const [loading, setLoading] = useState<boolean>(false);

  const handleEditorChange = (content: any) => {
    setFormData({ ...formData, content: content });
  };

  const onSignup = async (event: any) => {
    event.preventDefault();
    try {
      const formValue = new FormData();
      formValue.append("title", formData.title);
      formValue.append("category", formData.category);
      formValue.append("description", formData.content);
      formValue.append(
        "slug",
        formData.title.split(" ").join("-").toLowerCase()
      );
      formValue.append("excerpt", formData.excerpt);
      formValue.append("featuredPost", String(featuredPost));
      formValue.append("file", selectedFile as File);
      formValue.append("author", session?.user?.email as string);
      formValue.append("postId", postId as string);

      setLoading(true);
      if (editMode) {
        formValue.append("image_id", postData?.coverImage?.id as string);
        const response = await axios.post(`/api/blog/editBlog`, formValue, {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Expires: "0",
          },
        });
        if (response.data.status === 200) {
          setLoading(false);
          toast.success("Blog Updated Successfully");
          router.push("/myBlogs");
          router.refresh();
        }
      } else {
        if (
          !formData.title ||
          !formData.content ||
          !formData.category ||
          !formData.excerpt ||
          !selectedFile
        ) {
          toast.error("Please fill all the fields");
          setLoading(false);
          return;
        }
        const res = await axios.post("/api/blog/new", formValue);
        if (res.data.status == 201) {
          setLoading(false);
          toast.success("Blog Created Successfully");
          router.push("/");
          router.refresh();
        }
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong! Please try again later.");
      console.log(error);
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-5 text-center text-4xl font-extrabold leading-9 tracking-tight text-gray-200">
            {editMode ? "Edit The Post" : "Create A New Blog"}
          </h2>
        </div>
        <div className="mt-14 flex justify-center">
          <form onSubmit={(event) => onSignup(event)} method="POST">
            <div className="flex justify-between gap-4">
              <div className="mt-3">
                <label
                  htmlFor="title"
                  className="block text-base font-medium leading-6 text-gray-200"
                >
                  Title
                </label>
                <div className="mt-2">
                  <input
                    id="title"
                    name="title"
                    type="text"
                    autoComplete="title"
                    value={formData.title}
                    //   required
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="block p-2 w-96 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  ></input>
                </div>
              </div>
              <div className="mt-3">
                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select an option
                </label>
                <select
                  id="countries"
                  defaultValue={
                    editMode ? postData?.category?.category : "DEFAULT"
                  }
                  onChange={(e) => {
                    setFormData({ ...formData, category: e.target.value });
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option>Choose a Category</option>
                  <option value="Productivity">Productivity</option>
                  <option value="Technology">Technology</option>
                </select>
              </div>
            </div>

            <div className="mt-3">
              <label
                htmlFor="category"
                className="block text-base leading-6 text-gray-200"
              >
                Excerpt
              </label>
              <div className="mt-2">
                <input
                  id="excerpt"
                  name="excrept"
                  type="text"
                  autoComplete="excerpt"
                  value={formData.excerpt}
                  //   required
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                ></input>
              </div>
            </div>

            <div className="mt-3">
              <input
                type="checkbox"
                id="featuredPost"
                checked={featuredPost}
                name="feturedPost"
                onChange={() => {
                  setFeaturedPost(!featuredPost);
                }}
              />
              <label htmlFor="featuredPost">
                Do You want this post to be featured?
              </label>
            </div>

            <div className="my-3 w-[50%]">
              <label>
                <input
                  type="file"
                  hidden
                  className="w-[50%]"
                  onChange={({ target }) => {
                    if (target.files) {
                      const file = target.files[0];
                      console.log(file);
                      setFormData({
                        ...formData,
                        image: URL.createObjectURL(file),
                      });
                      setSelectedFile(file);
                    }
                  }}
                />
                <div className="w-full aspect-video rounded flex items-center justify-center border-2 border-dashed cursor-pointer">
                  {formData.image ? (
                    <Image
                      src={formData.image}
                      alt=""
                      width={300}
                      height={100}
                    />
                  ) : (
                    <span>Select Cover Image</span>
                  )}
                </div>
              </label>
            </div>

            <div className="w-full">
              <Editor
                id="tinyMCE"
                scriptLoading={{ async: true }}
                initialValue={editMode ? postData?.content.text : ""}
                onEditorChange={handleEditorChange}
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
                  ],
                  // codesample_languages: [
                  //   { text: "HTML/XML", value: "markup" },
                  //   { text: "JavaScript", value: "javascript" },
                  //   { text: "CSS", value: "css" },
                  //   { text: "PHP", value: "php" },
                  //   { text: "Ruby", value: "ruby" },
                  //   { text: "Python", value: "python" },
                  //   { text: "Java", value: "java" },
                  //   { text: "C", value: "c" },
                  //   { text: "C#", value: "csharp" },
                  //   { text: "C++", value: "cpp" },
                  // ],
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic blockquote link codesample |" +
                    "bullist numlist outdent indent | " +
                    "removeformat | help  code",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
              />
            </div>

            <div className="mt-10">
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-md bg-purple-600 px-5 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? (
                  <div className="flex justify-center content-center w-full">
                    <div className="flex-col gap-4 w-10 flex items-center justify-center">
                      <div className="w-8 h-8 border-4 text-purple-900 text-4xl animate-spin border-gray-200 flex items-center justify-center border-t-purple-900 rounded-full"></div>
                    </div>
                    <span className="m-2">Uploading Your Post... </span>
                  </div>
                ) : editMode ? (
                  "Update The Blog!"
                ) : (
                  "Post This Blog!"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
