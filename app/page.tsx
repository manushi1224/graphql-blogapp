import Blogs from "./components/Blogs/Blogs";
import { Suspense } from "react";
import Skeleton from "./components/Skeleton/Skeleton";
import { SearchInput } from "./components/SearchInputs/SearchInputs";

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
      <div className="flex justify-center">
        <SearchInput placeholder={"Search by Title...."} />
      </div>
      <h1 className="text-4xl text-center p-10 font-extrabold">All Posts</h1>
      <Suspense key={query} fallback={<Skeleton />}>
        <div className="w-full flex justify-center p-10">
          <Blogs query={query}/>
        </div>
      </Suspense>
    </main>
  );
}
