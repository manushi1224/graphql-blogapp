export async function fetchFilteredBlogs(query: any) {
  let result = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/blog/searchBlog/${query}`
  );
  if (!result.ok) {
    throw new Error("Something went wrong");
  }
  const data = await result.json();
  return data;
}
