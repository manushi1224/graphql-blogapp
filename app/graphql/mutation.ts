import { gql } from "graphql-request";

export const CreateNextUserMutation = gql`
  mutation createUser($userData: AuthorCreateInput!) {
    createAuthor(data: $userData) {
      id
    }
  }
`;

export const updatePostById = gql`
  mutation MyMutation(
    $content: RichTextAST!
    $excerpt: String!
    $featuredPost: Boolean!
    $title: String!
    $image_id: ID!
    $postId: ID!
    $category: ID!
    $slug: String!
  ) {
    updatePost(
      data: {
        content: $content
        excerpt: $excerpt
        featuredPost: $featuredPost
        title: $title
        slug: $slug
        coverImage: { connect: { id: $image_id } }
        category: { connect: { id: $category } }
      }
      where: { id: $postId }
    ) {
      id
    }
  }
`;

export const deletePostById = gql`
  mutation MyMutation($id: ID!) {
    deletePost(where: { id: $id }) {
      id
    }
  }
`;

export const createNewPost = gql`
  mutation createPost(
    $title: String!
    $category: ID!
    $content: RichTextAST!
    $slug: String!
    $excerpt: String!
    $featuredPost: Boolean!
    $author: ID!
    $image_id: ID!
  ) {
    createPost(
      data: {
        title: $title
        category: { connect: { id: $category } }
        content: $content
        slug: $slug
        excerpt: $excerpt
        featuredPost: $featuredPost
        author: { connect: { id: $author } }
        coverImage: { connect: { id: $image_id } }
      }
    ) {
      id
    }
  }
`;

export const deleteCommentById = gql`
  mutation MyMutation($id: ID!) {
    deleteComment(where: { id: $id }) {
      id
    }
  }
`;

export const updateAndPublishComment = gql`
  mutation MyMutation($id: ID!, $comment: String!) {
    updateComment(where: { id: $id }, data: { comment: $comment }) {
      id
    }
    publishComment(where: { id: $id }) {
      id
    }
  }
`;

export const createCommentByAuthorAndPostId = gql`
  mutation MyMutation($comment: String!, $id: ID!, $slug: String!) {
    createComment(
      data: {
        comment: $comment
        authors: { connect: { id: $id } }
        post: { connect: { slug: $slug } }
      }
    ) {
      id
      post {
        id
        author {
          id
        }
      }
    }
  }
`;

export const createLikeByAuthorAndPostId = gql`
  mutation MyMutation($id: ID!, $postId: ID!) {
    createLike(
      data: {
        author: { connect: { id: $id } }
        posts: { connect: { id: $postId } }
      }
    ) {
      id
    }
  }
`;

export const updateAndPublishLike = gql`
  mutation MyMutation($likeId: ID!, $postId: ID!) {
    updateLike(
      data: { posts: { connect: { where: { id: $postId } } } }
      where: { id: $likeId }
    ) {
      id
    }
    publishLike(where: { id: $likeId }) {
      id
    }
  }
`;

export const deleteAssetById = gql`
  mutation MyMutation($id: ID!) {
    deleteAsset(where: { id: $id }) {
      id
    }
  }
`;
