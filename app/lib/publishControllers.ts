import { gql } from "graphql-request";
import client from "./client";

async function publishPost(id: string) {
  const mutation = gql`
    mutation MyMutation($id: ID!) {
      publishPost(where: { id: $id }) {
        id
      }
    }
  `;
  const response = await client.request(mutation, { id });
  console.log(response);
}

async function publishAsset(id: string) {
  const mutation = gql`
    mutation MyMutation($id: ID!) {
      publishAsset(where: { id: $id }) {
        id
      }
    }
  `;
  const response = await client.request(mutation, { id });
  console.log(response);
}

async function publishCategory(id: string) {
  const mutation = gql`
    mutation MyMutation($id: ID!) {
      publishCategory(where: { id: $id }) {
        id
      }
    }
  `;
  const response = await client.request(mutation, { id });
  console.log(response);
}

async function publishAuthor(id: string) {
  const mutation = gql`
    mutation MyMutation($id: ID!) {
      publishAuthor(where: { id: $id }) {
        id
      }
    }
  `;
  const response = await client.request(mutation, { id });
  console.log(response);
}

async function publishComment(id: string) {
  const mutation = gql`
    mutation MyMutation($id: ID!) {
      publishComment(where: { id: $id }) {
        id
      }
    }
  `;
  const response = await client.request(mutation, { id });
  console.log(response);
}

async function publishLike(id: string) {
  const mutation = gql`
    mutation MyMutation($id: ID!) {
      publishLike(where: { id: $id }) {
        id
      }
    }
  `;
  const response = await client.request(mutation, { id });
  console.log(response);
}

export {
  publishAsset,
  publishPost,
  publishCategory,
  publishAuthor,
  publishComment,
  publishLike,
};
