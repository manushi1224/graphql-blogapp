import {
  getAllCommentsBySlug,
  getAllPosts,
  getCategoryDataByName,
  getLikesByAuthorId,
  getUserByEmailQuery,
} from "@/app/graphql/query";
import client from "@/app/lib/client";
import { GraphQLClient } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

const graphQLClient = new GraphQLClient(graphqlAPI as string);

async function getPosts() {
  const response: any = await graphQLClient.request(getAllPosts);
  return response.postsConnection.edges;
}

const GetUserByEmail = async (email: string) => {
  const getUserResponse: any = await client.request(getUserByEmailQuery, {
    email,
  });
  return { user: getUserResponse.authors[0] };
};

const getCategoryByName = async (name: string) => {
  console.log(name);
  const getUserResponse: any = await client.request(getCategoryDataByName, {
    name,
  });
  return { categories: getUserResponse.categories[0] };
};

async function getAllComments(slug: string) {
  const response: any = await client.request(getAllCommentsBySlug, { slug });
  return response.commentsConnection.edges;
}

async function getLikesByPostId(authId: string) {
  const response: any = await client.request(getLikesByAuthorId, { authId });
  return response.likesConnection.edges;
}

export {
  GetUserByEmail,
  getPosts,
  getCategoryByName,
  getAllComments,
  getLikesByPostId,
};
