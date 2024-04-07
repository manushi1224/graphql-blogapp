"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export const dynamic = "force-dynamic";

function CommentBox({ slug, postId, likes }: any) {
  const [comment, setComment] = useState<string>("");
  const { data: session } = useSession();
  const router = useRouter();

  const handleLike = async (id: any) => {
    if (session?.user?.email === undefined) {
      toast.error("Please login to like this post!");
      return;
    }
    try {
      console.log(session?.user?.email, "email");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/likes/createLike/${id}`,
        { email: session?.user?.email }
      );
      const data = response.data;
      console.log(data, "data");
      if (data.message === "success") {
        toast.success("Thanks for your feedback!");
        router.refresh();
      } else {
        toast.error("You have already liked this post!");
      }
    } catch (error) {}
  };

  const handleComment = async (e: any) => {
    e.preventDefault();
    if (session?.user?.email === undefined) {
      toast.error("Please login to comment on this post!");
      return;
    }
    if (comment === "") {
      toast.error("Please enter a comment");
      return;
    }

    const formData = new FormData();
    formData.append("comment", comment);
    formData.append("slug", slug);
    formData.append("email", session?.user?.email as string);

    try {
      const response = await axios.post("/api/comment/new", formData);
      const data = response.data;
      if (data.message === "success") {
        toast.success("Thanks for your feedback!");
        setComment("");
        router.refresh();
      }
    } catch (error) {
      toast.error("something went wrong!");
      console.log(error);
    }
  };

  return (
    <div className="w-[70%] max-xl:w-[100%]">
      <Toaster />
      <div className="bg-white border border-slate-200 grid grid-cols-8 gap-2 rounded-xl p-5 text-sm h-96">
        <h1 className="text-slate-900 text-2xl font-extrabold col-span-8">
          Add Your Feedback
        </h1>
        <form
          onSubmit={(e) => {
            handleComment(e);
          }}
          className="col-span-8 grid grid-cols-4 gap-2"
        >
          <textarea
            placeholder="Your feedback..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="col-span-4 bg-slate-100 w-full text-slate-600 h-64 placeholder:text-slate-600 placeholder:opacity-50 border-2 border-slate-200 resize-none outline-none rounded-lg p-2 duration-300 focus:border-slate-600"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-300 stroke-slate-900 border-2 border-slate-200 col-span-1 flex justify-center rounded-lg p-2 duration-300 hover:border-slate-800 hover:text-white focus:stroke-blue-900 focus:bg-blue-400"
          >
            <svg
              fill="none"
              viewBox="0 0 24 24"
              height="30px"
              width="30px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="1.5"
                d="M7.39999 6.32003L15.89 3.49003C19.7 2.22003 21.77 4.30003 20.51 8.11003L17.68 16.6C15.78 22.31 12.66 22.31 10.76 16.6L9.91999 14.08L7.39999 13.24C1.68999 11.34 1.68999 8.23003 7.39999 6.32003Z"
              ></path>
              <path
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="1.5"
                d="M10.11 13.6501L13.69 10.0601"
              ></path>
            </svg>
          </button>
          <span className="col-span-2"></span>
          <button
            type="button"
            onClick={() => {
              handleLike(postId);
            }}
            className="fill-slate-900 col-span-1 flex justify-center items-center gap-2 rounded-lg p-2 duration-300 bg-green-200 hover:border-slate-800 focus:fill-green-900 focus:bg-green-400 border-2 border-slate-200"
          >
            <span className="text-base font-semibold text-black">{likes}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 0 512 512"
            >
              <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"></path>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

export default CommentBox;
