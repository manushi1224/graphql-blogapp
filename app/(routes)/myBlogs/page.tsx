import DeleteModal from "@/app/ui/DeleteModal";
import PostCard from "@/app/ui/PostCard";
import { getPosts } from "@/services";
import { headers } from "next/headers";
import Link from "next/link";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const blogData = await getPosts();

  return blogData.edges.map((item: any) => ({ slug: item.node.slug }));
}

async function getIndividualPost() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/blog/myblog/`,
      { cache: "no-cache", headers: new Headers(headers()) }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data from server");
    }
    const { posts } = await response.json();
    return posts;
  } catch (error) {
    console.error(error);
  }
}

export default async function Page() {
  const posts = await getIndividualPost();
  if (!posts) {
    return (
      <div className="text-center">
        <h3>There is no post to be showed!</h3>
        <p className="text-blue-400">
          <Link href={"/createBlog"}>Try Creating One?</Link>
        </p>
      </div>
    );
  }
  return (
    <div>
      <PostCard posts={posts} />
    </div>
  );
}
