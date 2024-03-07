import Image from "next/image";
import Blogs from "./components/Blogs/Blogs";

export default function Home() {
  return (
    <main>
      <div className="flex justify-center">
        {/* <SearchInput placeholder={"Search by Title...."} /> */}
      </div>
      <h1 className="text-4xl text-center p-10 font-extrabold">All Posts</h1>
      {/* <Suspense key={query} fallback={<Skeleton />}>
      <div className="w-full flex justify-center p-10">
        <Blogs query={query} />
      </div>
    </Suspense> */}
      <div className="w-full flex justify-center p-10">
        <Blogs />
      </div>
    </main>
  );
}
