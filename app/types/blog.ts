type Blog = {
  node: {
    id: string;
    createdAt: string;
    category: {
      category: string;
    };
    author: Author;
    slug: string;
    title: string;
    excerpt: string;
    featuredPost: boolean;
    coverImage: {
      url: string;
    };
    likes: Author[];
    content: string;
  };
};

type Author = {
  id: string;
  name: string;
  email?: string;
  bio?: string;
};
