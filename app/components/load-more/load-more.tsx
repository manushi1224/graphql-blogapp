"use client";
import { fetchPaginatedBlogs } from "@/app/actions/fetch-post";
import Spinner from "@/app/ui/Spinner";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import InfiniteScroll from "../InfiniteScroll/InfiniteScroll";

const LoadMore = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [skip, setSkip] = useState<number>(3);
  const [endOfPage, setEndOfPage] = useState<boolean>(false);

  const { ref, inView } = useInView();

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const loadMorePosts = async () => {
    await delay(1000);
    const newBlogs = (await fetchPaginatedBlogs(3, skip)) ?? [];
    if (newBlogs.length > 0) {
      setBlogs((prevBlogs) => [...prevBlogs, ...newBlogs]);
      setSkip(skip + 3);
    } else {
      setEndOfPage(true);
    }
  };

  useEffect(() => {
    if (inView) {
      console.log("inView");
      loadMorePosts();
    }
  }, [inView]);
  return (
    <>
      <InfiniteScroll blogs={blogs} />
      <div
        className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3"
        ref={ref}
      >
        {endOfPage ? (
          <span className=" my-10">You have reached the end of the page!</span>
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
};

export default LoadMore;
