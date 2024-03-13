import Image from "next/image";
import Link from "next/link";
import React from "react";

function FeaturedPostCard({ posts }: any) {
  return posts.map((post: any) => {
    return (
      <Link href={`${process.env.NEXT_PUBLIC_API}/blog/${post.node.slug}`}>
        <div className="max-w-sm w-full lg:max-w-full lg:flex rounded-xl mt-5">
          <div className="h-10 lg:h-auto lg:w-48 flex-none bg-cover rounded-l max-lg:rounded-t text-center overflow-hidden">
            <Image
              alt="image"
              src={post.node.coverImage.url}
              height={300}
              className="w-full h-full object-cover object-center"
              width={300}
            />
          </div>
          <div className="bg-gray-800 bg-opacity-90 rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div className="">
              <div className="text-fuchsia-600 font-semibold text-sm">
                {post.node.category.category}
              </div>
              <div className="text-gray-200 font-bold text-base mb-2">
                {post.node.title.slice(0, 36)}
                {post.node.title.length > 36 && "..."}
              </div>
            </div>
            <div className="flex items-center">
              <div className="text-sm">
                <span className="text-gray-300 text-sm font-semibold">
                  {post.node.author.name}
                </span>
                <div className="text-gray-400 text-sm">{post.node.createdAt.split("T")[0]}</div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  });
}

export default FeaturedPostCard;
