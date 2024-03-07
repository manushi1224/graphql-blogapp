import { getPosts } from "@/services";
import { headers } from "next/headers";
import Image from "next/image";

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
  return (
    <div>
      {posts.map((post: any, index: any) => {
        return (
          <ul
            className="grid grid-cols-1 gap-y-10 gap-x-6 items-start p-8 m-8 bg-slate-900 border rounded-lg"
            key={index}
          >
            <li className="relative flex flex-col sm:flex-row items-start">
              <div className="order-1 sm:ml-6 xl:ml-0">
                <h3 className="mb-1 text-slate-900 font-semibold dark:text-slate-200">
                  <span className="mb-1 block text-sm leading-6 text-indigo-500">
                    {post.node.category.category}
                  </span>
                  {post.node.title}
                </h3>
                <div className="prose prose-slate prose-sm text-slate-500 dark:prose-dark">
                  <p>{post.node.excerpt}</p>
                </div>
                <a
                  className="group me-3 inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-5 focus:outline-none focus:ring-2 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 focus:ring-slate-500 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600 dark:hover:text-white dark:focus:ring-slate-500 mt-6"
                  href="https://headlessui.dev"
                >
                  Edit
                </a>
                <a
                  className="mx-3 group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-5 focus:outline-none focus:ring-2 bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-900 focus:ring-red-500 dark:bg-red-700 dark:text-slate-100 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-500 mt-6"
                  href="https://headlessui.dev"
                >
                  Delete
                </a>
              </div>
              <Image
                src={post.node.coverImage.url}
                alt=""
                className="mx-0 sm:mx-6 shadow-md rounded-lg bg-slate-50 w-[17rem]"
                width={1216}
                height={760}
              ></Image>
            </li>
          </ul>
        );
      })}
    </div>
  );
}
