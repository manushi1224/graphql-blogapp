// import { fetchFilteredBlogs } from "@/app/lib/fetchFilteredBlogs";
// import { getAllBlogs } from "@/app/lib/blog";
import BlogCard from "@/app/ui/BlogCard";
import { getPosts } from "@/services/index";

export default async function Blogs() {
  const posts = await getPosts();
  //   let blogData = await getAllBlogs();
  //   if (query) {
  //     blogData = await fetchFilteredBlogs(query);
  //   }
  //   if (blogData.blogs) {
  //     return <BlogCard blogs={blogData.blogs} />;
  //   }
  return <BlogCard blogs={posts.edges} />;
}
