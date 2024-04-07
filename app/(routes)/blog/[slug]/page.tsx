import CommentBox from "@/app/components/CommentBox/CommentBox";
import CommentSection from "@/app/components/CommentSection/CommentSection";
import FeaturedPosts from "@/app/components/FeautredPosts/FeaturedPosts";
import FeaturedPostCard from "@/app/ui/FeaturedPostCard";
import { getPosts } from "@/services";
import Image from "next/image";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const blogData = await getPosts();

  return blogData.map((item: any) => ({ slug: item.node.slug }));
}

async function getBlogBySlug(slug: any) {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/blog/singleBlog/${slug}`,
    { cache: "no-cache" }
  );

  if (!result.ok) {
    throw new Error("Failed to fetch data from server");
  }
  const data = await result.json();
  return data;
}

export default async function Page({ params }: any) {
  const data = await getBlogBySlug(params.slug);

  return (
    <div className="py-10 grid grid-cols-12 max-w-screen-xl flex-wrap items-center justify-between mx-auto max-xl:px-8">
      <div className="col-span-8 max-xl:col-span-12">
        <div className="flex flex-wrap items-center justify-between">
          <div className="p-2 mt-10">
            <h2 className="text-4xl font-bold w-[80%] max-xl:w-[100%]">
              {data.title}
            </h2>
            <div className="flex pt-5">
              <h4 className="text-lg font-semibold text-fuchsia-400 pe-3">
                {data.category.category}
              </h4>
              |
              <h4 className="text-lg font-semibold text-fuchsia-400 px-3">
                {data.createdAt.split("T")[0]}
              </h4>
              |
              <h4 className="text-lg font-semibold text-fuchsia-400 px-3">
                {data.author.name}
              </h4>
            </div>
            <h4 className="pt-5 text-lg w-[70%] max-xl:w-[100%] text-justify">
              {data.excerpt}
            </h4>
          </div>
          <div className="mt-16">
            <Image
              height={200}
              width={500}
              src={data.coverImage.url}
              alt="data-img"
              className="pt-5 object-cover w-[55rem] max-md:w-[40rem] max-sm:w-[20rem] max-sm:h-[20rem] max-md:h-[40rem] h-[30rem]"
            />
          </div>

          <div
            className="my-5 rich-text w-[80%] ps-0 max-xl:w-[100%] max-xl:text-justify"
            dangerouslySetInnerHTML={{ __html: `${data.content.html}` }}
          ></div>
        </div>
        <div className="max-w-screen-xl mx-auto">
          <CommentBox
            slug={params.slug}
            postId={data.id}
            likes={data.likes.length}
          />
          <CommentSection slug={params.slug} />
        </div>
      </div>
      <div className="col-span-4 fixed top-[7rem] bottom-0 right-[max(0px,calc(50%-45rem))] w-[25rem] overflow-y-auto hidden xl:block">
        <h1 className="text-xl font-extrabold pb-4">Featured Posts</h1>
        <hr />
        <FeaturedPosts />
      </div>
    </div>
  );
}
