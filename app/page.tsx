import Blogs from "./components/Blogs/Blogs";
import { Suspense } from "react";
import { SearchInput } from "./components/SearchInputs/SearchInputs";
import FilterTabs from "./components/FilterTabs/FilterTabs";
import FeaturedPosts from "./components/FeautredPosts/FeaturedPosts";
import Skeleton from "./ui/Skeleton";

export default function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || "";
  return (
    <main>
      <div className="w-full px-16 pb-10 max-sm:px-4 grid grid-cols-12">
        <div className="col-span-8 max-sm:col-span-12 max-xl:col-span-12">
          <div className="sticky top-[4rem] z-10 bg-black p-2 gap-0">
            <FilterTabs />
            <div className="flex justify-center w-full">
              <SearchInput placeholder={"Search by Title...."} />
            </div>
          </div>

          {/* <h1 className="text-4xl text-center p-10 font-extrabold">
            All Posts
          </h1> */}
          <Suspense key={query} fallback={<Skeleton />}>
            <Blogs query={query} />
          </Suspense>
        </div>
        <div className="col-span-4 fixed top-[3.8125rem] bottom-0 right-[max(0px,calc(50%-45rem))] w-[25rem] py-10 overflow-y-auto hidden xl:block">
          <h1 className="text-xl font-extrabold pb-4">Featured Posts</h1>
          <hr />
          <FeaturedPosts />
        </div>
      </div>
    </main>
  );
}
