type Blog = {
  id: string;
  createdAt: string;
  category: {
    id: string;
    category: string;
  };
  author: Author;
  slug: string;
  title: string;
  excerpt: string;
  featuredPost: boolean;
  coverImage: {
    id: string;
    url: string;
  };
  likes: Likes[];
  content: {
    html: string;
    text: string;
  };
};

type BlogList = {
  node: Blog;
}[];
