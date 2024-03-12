import { gql } from "graphql-request";
import client from "./client";

export async function deleteAsset(imageId: string) {
  const mutation = gql`
    mutation MyMutation($id: ID!) {
      deleteAsset(where: { id: $id }) {
        id
      }
    }
  `;

  const response = await client.request(mutation, { id: imageId });
  console.log(response);
}
