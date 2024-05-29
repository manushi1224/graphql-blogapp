"use server";
import { gql, GraphQLClient } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphQLClient = new GraphQLClient(graphqlAPI as string);

export async function fetchPaginatedBlogs(first: number, skip: number) {
  try {
    const response: any = await graphQLClient.request(
      gql`
        query Posts($first: Int!, $skip: Int!) {
          postsConnection(first: $first, skip: $skip) {
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
      `,
      { first, skip }
    );
    // console.log(response.postsConnection.edges);
    return response.postsConnection.edges;
  } catch (error) {
    console.log(error);
    return null;
  }
}
