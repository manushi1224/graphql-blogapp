"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import DeleteModal from "./DeleteModal";
import toast, { Toaster } from "react-hot-toast";

function PostCard({ posts }: { posts: BlogList }) {
  const [deletePost, setDeletePost] = useState(false);

  const closePopup = (status: boolean) => {
    setDeletePost(status);
  };

  const deletePostHandler = (status: boolean) => {
    if (status) {
      toast.success("Post deleted successfully!");
    }
  };

  return (
    <div>
      <Toaster />
      {posts &&
        posts.map((post: { node: Blog }, index: number) => {
          return (
            <div key={index}>
              <ul
                className="grid grid-cols-1 gap-y-10 gap-x-6 items-start p-8 m-8 bg-slate-500 bg-opacity-20 shadow-md shadow-gray-800 rounded-lg"
                key={index}
              >
                {deletePost && (
                  <DeleteModal
                    closePopup={closePopup}
                    id={post.node.id}
                    deletePostHandler={deletePostHandler}
                    imageId={post.node.coverImage?.id}
                    catId={post.node.category.id}
                    authId={post.node.author.id}
                  />
                )}
                <li className="relative flex flex-col sm:flex-row items-start">
                  <div className="order-1 sm:ml-6 xl:ml-0">
                    <h3 className="mb-1 text-slate-900 font-semibold dark:text-slate-200">
                      <span className="mb-1 block text-sm leading-6 text-fuchsia-500">
                        {post.node.category.category}
                      </span>
                      {post.node.title}
                    </h3>
                    <div className="prose prose-slate prose-sm text-slate-500 dark:prose-dark">
                      <p>{post.node.excerpt}</p>
                    </div>
                    <Link
                      className="group me-3 inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-5 focus:outline-none focus:ring-2 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 focus:ring-slate-500 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600 dark:hover:text-white dark:focus:ring-slate-500 mt-6"
                      href={`${process.env.NEXT_PUBLIC_API}/editBlog/${post.node.id}`}
                    >
                      Edit
                    </Link>
                    <button
                      className="mx-3 group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-5 focus:outline-none focus:ring-2 bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-900 focus:ring-red-500 dark:bg-red-700 dark:text-slate-100 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-500 mt-6"
                      onClick={() => setDeletePost(true)}
                    >
                      Delete
                    </button>
                  </div>
                  <Image
                    src={post.node.coverImage?.url}
                    alt=""
                    className="mx-0 sm:mx-6 shadow-md rounded-lg bg-slate-50 w-[17rem]"
                    width={1216}
                    height={760}
                  ></Image>
                </li>
              </ul>
            </div>
          );
        })}
    </div>
  );
}

export default PostCard;
