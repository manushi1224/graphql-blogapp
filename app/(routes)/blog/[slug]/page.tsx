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
    <div
      key={data.id}
      className="flex flex-col items-center justify-center p-10"
    >
      <div className="p-2 text-center">
        <h3 className="text-3xl text-fuchsia-500 font-semibold">
          {data.category.category}
        </h3>
        <h2 className="text-4xl font-bold pt-5">{data.title}</h2>
        <h4 className="pt-5 text-lg px-32">{data.excerpt}</h4>
      </div>
      <div className="mt-16">
        <div className="flex justify-center">
          <h4 className="text-lg font-semibold text-gray-300 text-opacity-70 px-3">
            {data.createdAt.split("T")[0]}
          </h4>
          |
          <h4 className="text-lg font-semibold text-gray-300 text-opacity-70 px-3">
            {data.author.name}
          </h4>
        </div>
        <Image
          height={200}
          width={500}
          src={data.coverImage.url}
          alt="data-img"
          className="pt-5 object-cover w-[60rem] max-md:w-[40rem] max-sm:w-[20rem] max-sm:h-[20rem] max-md:h-[40rem] h-[30rem]"
        />
      </div>

      <div
        className="m-5 rich-text"
        dangerouslySetInnerHTML={{ __html: `${data.content.html}` }}
      ></div>
    </div>
  );
}
