import { gql } from "graphql-request";

export const getAllPosts = gql`
  query Posts {
    postsConnection {
      edges {
        node {
          id
          createdAt
          category {
            category
          }
          author {
            name
          }
          slug
          title
          excerpt
          featuredPost
          coverImage {
            url
          }
          likes {
            author {
              id
              name
            }
          }
        }
      }
    }
  }
`;

export const getUserByEmailQuery = gql`
  query getUserByEmailQuery($email: String!) {
    authors(where: { email: $email }, stage: DRAFT) {
      id
      email
      password
      name
    }
  }
`;

export const getCategoryDataByName = gql`
  query getCategoryByNameQuery($name: String!) {
    categories(where: { category: $name }, stage: DRAFT) {
      id
      category
      slug
    }
  }
`;

export const getAllCommentsBySlug = gql`
  query MyQuery($slug: String!) {
    commentsConnection(where: { post: { slug: $slug } }) {
      edges {
        node {
          authors {
            name
            id
            email
          }
          post {
            id
            slug
          }
          comment
          createdAt
          id
        }
      }
    }
  }
`;

export const getLikesByAuthorId = gql`
  query MyQuery($authId: ID!) {
    likesConnection(where: { author: { id: $authId } }) {
      edges {
        node {
          posts {
            title
            slug
            id
          }
          id
        }
      }
    }
  }
`;

export const getPostDataById = gql`
  query MyQuery($id: ID!) {
    postsConnection(where: { id: $id }) {
      edges {
        node {
          category {
            category
            id
          }
          title
          coverImage {
            url
            id
          }
          excerpt
          id
          content {
            text
            html
            raw
          }
          featuredPost
        }
      }
    }
  }
`;
