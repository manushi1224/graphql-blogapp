import Image from "next/image";
import Link from "next/link";

function BlogCard({ blogs }: { blogs: BlogList }) {
  if (blogs.length === 0) {
    return <div>No blogs to be shown</div>;
  }

  return (
    <div className="w-full grid grid-cols-3 max-lg:grid-cols-2 gap-6 max-sm:grid-cols-1">
      {blogs.map((blog: { node: Blog }, index: number) => {
        return (
          <Link
            href={`/blog/${blog.node.slug}`}
            key={index}
            className="max-w-sm cursor-pointer overflow-hidden relative transition-all duration-500 hover:translate-y-2 bg-gray-800 rounded-lg shadow-xl flex flex-row before:absolute before:w-full hover:before:top-0 before:duration-500 before:-top-1 before:h-1 before:bg-fuchsia-500"
          >
            <div>
              <div className="p-3">
                <Image
                  className="rounded-lg object-cover w-full h-52"
                  src={blog.node.coverImage?.url}
                  height={200}
                  width={400}
                  alt="blog-image"
                  priority={true}
                />
              </div>
              <div className="border-l-4 border-l-fuchsia-600 h-8">
                <div className="mx-3 pt-1 text-base text-fuchsia-500 font-semibold">
                  {blog.node.category.category}
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
