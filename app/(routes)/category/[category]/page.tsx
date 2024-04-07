import React, { Suspense } from "react";
import FilterTabs from "@/app/components/FilterTabs/FilterTabs";
import BlogCard from "@/app/ui/BlogCard";
import FeaturedPosts from "@/app/components/FeautredPosts/FeaturedPosts";
import Skeleton from "@/app/ui/Skeleton";

async function getFileterdPosts(category: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/blog/category/${category}`,
    { cache: "no-cache" }
  );
  if (!res.ok) {
    console.error(`An error occurred: ${res.statusText}`);
    return;
  }
  const data = await res.json();
  return data;
}

async function Page({ params }: { params: { category: string } }) {
  const { filteredPosts } = await getFileterdPosts(params.category);

  return (
    <div>
      <div className="px-16 pb-10 max-sm:px-4 grid grid-cols-12">
        <div className="col-span-8 max-sm:col-span-12">
          <FilterTabs category={params.category} />
          <div className="mt-10">
            <Suspense key={filteredPosts} fallback={<Skeleton />}>
              <BlogCard blogs={filteredPosts} />
            </Suspense>
          </div>
        </div>
        <div className="col-span-4 fixed z-20 top-[3.8125rem] bottom-0 right-[max(0px,calc(50%-45rem))] w-[25rem] py-10 overflow-y-auto hidden xl:block">
          <h1 className="text-xl font-extrabold pb-4">Featured Posts</h1>
          <hr />
          <FeaturedPosts />
        </div>
      </div>
    </div>
  );
}

export default Page;
