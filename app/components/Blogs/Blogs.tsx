import { fetchPaginatedBlogs } from "@/app/actions/fetch-post";
import { fetchFilteredBlogs } from "@/app/lib/fetchFilteredBlogs";
import InfiniteScroll from "../InfiniteScroll/InfiniteScroll";
import LoadMore from "../load-more/load-more";

export default async function Blogs({ query }: { query?: string }) {
  let blogData: BlogList = await fetchPaginatedBlogs(3, 0);
  if (query) {
    blogData = await fetchFilteredBlogs(query);
    return (
      <div className="flex flex-col gap-10">
        <InfiniteScroll blogs={blogData} />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-10">
      <InfiniteScroll blogs={blogData} />
      <LoadMore />
    </div>
  );
}
