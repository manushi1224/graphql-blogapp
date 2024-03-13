import React from "react";
import FeaturedPostCard from "@/app/ui/FeaturedPostCard";
import { getPosts } from "@/services";

async function getFeturedBlogs() {
  const allBlogs = await getPosts();
  const featuredBlogs = allBlogs.filter(
    (blog: any) => blog.node.featuredPost === true
  );
  return featuredBlogs;
}

async function FeaturedPosts() {
  const featuredBlogs = await getFeturedBlogs();
  return (
    <div className="mt-5">
      <FeaturedPostCard posts={featuredBlogs} />
    </div>
  );
}

export default FeaturedPosts;
