type Comments = CommentUser[];

type CommentUser = {
  node: {
    id: string;
    createdAt: string;
    comment: string;
    post: Blog;
    authors: Author[];
  };
};
