import Image from "next/image";
import Link from "next/link";

function BlogCard({ blogs }: any) {
  return (
    <div className="w-[75%] grid grid-cols-3 gap-10 max-md:grid-cols-2 max-sm:grid-cols-1">
      {blogs.map((blog: any) => {
        return (
          <Link
            href={`/blog/${blog.node.slug}`}
            key={blog.node.slug}
            className="max-w-sm relative bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 shadow-gray-600"
          >
            <div>
              <div className="p-3">
                <Image
                  className="rounded-lg"
                  src={blog.node.coverImage.url}
                  height={200}
                  width={400}
                  alt="blog-image"
                  priority={true}
                />
              </div>
              <div className="border-l-4 border-l-fuchsia-600 h-8">
                <div className="mx-3 pt-1 text-base text-fuchsia-500 font-semibold">
                  {blog.node.category.name}
                </div>
              </div>
              <div className="p-5 mb-12">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {blog.node.title}
                </h5>
              </div>
              <div className="flex justify-between absolute inset-x-0 bottom-0 p-5">
                <div className="text-gray-200 text-opacity-60">
                  {blog.node.createdAt.split("T")[0]}
                </div>
                <div className="text-gray-200 text-opacity-60">
                  {blog.node.author.name}
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default BlogCard;
