import { getPosts } from "@/services";
import Image from "next/image";

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  const blogData = await getPosts();

  return blogData.edges.map((item: any) => ({ slug: item.node.slug }));
}

async function getBlogBySlug(slug: any) {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/blog/singleBlog/${slug}`,
    { cache: "no-cache" }
  );
  
  if(!result.ok){
    throw new Error("Failed to fetch data from server");
  }
  const data = await result.json();
  return data;
}

export default async function Page({ params }: any) {
  const data  = await getBlogBySlug(params.slug);

  return (
    <div
      key={data.slug}
      className="flex flex-col items-center justify-center p-10"
    >
      <div className="p-2 text-center">
        <h3 className="text-3xl text-fuchsia-500 font-semibold">
          {data.title}
        </h3>
        <h2 className="text-4xl font-bold pt-5">{data.title}</h2>
      </div>
      <div className="mt-20">
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
          className="pt-5"
        />
      </div>

    <div className="m-5 rich-text" dangerouslySetInnerHTML={{ __html: `${data.content.html}` }}></div>
    </div>
  );
}
