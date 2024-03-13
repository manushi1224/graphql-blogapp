import { fetchFilteredBlogs } from "@/app/lib/fetchFilteredBlogs";
import BlogCard from "@/app/ui/BlogCard";
import { getPosts } from "@/services/index";

export default async function Blogs({ query }: { query?: string }) {
  let blogData = await getPosts();
  if (query) {
    blogData = await fetchFilteredBlogs(query);
  }
  return (
    <>
      <BlogCard blogs={blogData} />
    </>
  );
}
