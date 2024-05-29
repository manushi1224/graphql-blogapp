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
  const featuredBlogs: BlogList = await getFeturedBlogs();
  return (
    <div>
      <FeaturedPostCard posts={featuredBlogs} />
    </div>
  );
}

export default FeaturedPosts;
