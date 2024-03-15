import { gql, GraphQLClient } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const customGraphToken = process.env.NEXT_PUBLIC_HYGRAPH_TOKEN;

const client = new GraphQLClient(graphqlAPI as string, {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${customGraphToken}`,
  },
});

const graphQLClient = new GraphQLClient(graphqlAPI as string);

async function getPosts() {
  const query = gql`
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

  const response: any = await graphQLClient.request(query);
  return response.postsConnection.edges;
}

const GetUserByEmail = async (email: string) => {
  const getUserByEmailQuery = gql`
    query getUserByEmailQuery($email: String!) {
      authors(where: { email: $email }, stage: DRAFT) {
        id
        email
        password
        name
      }
    }
  `;

  const getUserResponse: any = await client.request(getUserByEmailQuery, {
    email,
  });
  return { user: getUserResponse.authors[0] };
};

const getCategoryByName = async (name: string) => {
  console.log("cateegory is:", name);
  const getCategoryByName = gql`
    query getCategoryByNameQuery($name: String!) {
      categories(where: { category: $name }, stage: DRAFT) {
        id
        category
        slug
      }
    }
  `;

  const getUserResponse: any = await client.request(getCategoryByName, {
    name,
  });
  return { categories: getUserResponse.categories[0] };
};

async function getAllComments(slug: string) {
  const query = gql`
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

  const response: any = await client.request(query, { slug });
  return response.commentsConnection.edges;
}

async function getLikesByPostId(authId: string) {
  const query = gql`
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

  const response: any = await client.request(query, { authId });
  return response.likesConnection.edges;
}

export {
  GetUserByEmail,
  getPosts,
  getCategoryByName,
  getAllComments,
  getLikesByPostId,
};
