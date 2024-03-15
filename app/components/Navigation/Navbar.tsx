"use client";
import React from "react";
import img from "@/public/blogbreeze.png";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 mb-5 sticky top-0 z-10">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image
            src={img}
            className="h-8"
            alt="blog-breeze"
            width={170}
            height={0}
          />
        </Link>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                href="/"
                className="block py-2 px-3 text-white bg-fuchsia-700 rounded md:bg-transparent md:text-fuchsia-700 md:p-0 dark:text-white md:dark:text-fuchsia-500"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            {session ? (
              <>
                <li>
                  <Link
                    href="/createBlog"
                    className="block py-2 px-3 text-white bg-fuchsia-700 rounded md:bg-transparent md:text-fuchsia-700 md:p-0 dark:text-white md:dark:text-fuchsia-500"
                    aria-current="page"
                  >
                    Create Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/myBlogs"
                    className="block py-2 px-3 text-white bg-fuchsia-700 rounded md:bg-transparent md:text-fuchsia-700 md:p-0 dark:text-white md:dark:text-fuchsia-500"
                    aria-current="page"
                  >
                    My Blogs
                  </Link>
                </li>
                <div className="dropdown inline-block relative">
                  <button className="bg-transperent text-fuchsia-500 font-semibold rounded inline-flex items-center">
                    <span className="mr-1">
                      {status === "authenticated" && (
                        <div className="flex gap-3">
                          {/* <span>{session?.user?.id!}</span> */}
                          <Image
                            height={25}
                            width={25}
                            className="rounded-full"
                            src={
                              session?.user?.image! ||
                              `https://avatar.iran.liara.run/username?username=${session.user?.name}`
                            }
                            alt="Rounded avatar"
                          ></Image>
                          <span className="">{session.user?.name}</span>
                        </div>
                      )}
                    </span>
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
                    </svg>
                  </button>
                  <ul className="dropdown-menu absolute hidden text-gray-700 pt-1 w-[10rem] z-50">
                    <li className="z-50">
                      <span className="rounded-t text-sm bg-gray-800 py-2 px-4 block whitespace-no-wrap text-fuchsia-300 z-50">
                        Signed in as{" "}
                        {status === "authenticated" && session.user?.name}
                      </span>
                    </li>
                    <li className="z-100">
                      <Link
                        href="/api/auth/signout"
                        className="block py-2 px-4 hover:bg-gray-600 hover:text-fuchsia-300 text-white bg-gray-800 rounded-b md:text-fuchsia-700 dark:text-white md:dark:text-fuchsia-500"
                        aria-current="page"
                      >
                        Sign Out
                      </Link>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-white md:bg-transparent md:text-fuchsia-700 md:dark:text-fuchsia-500"
                >
                  Sign in
                </Link>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
