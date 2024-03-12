import { gql } from "graphql-request";
import client from "./client";

const graphqlAssetAPI = process.env.NEXT_PUBLIC_HYGRAPH_ASSET_API;
const customGraphToken = process.env.NEXT_PUBLIC_HYGRAPH_TOKEN;

export async function uploadAsset(form: File) {
  let image_id;
  console.log(form);
  try {
    const response = await fetch(graphqlAssetAPI as string, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${customGraphToken}`,
      },
      body: form,
    });
    const imageUploaded = await response.json();
    console.log(imageUploaded);

    image_id = imageUploaded.id;
    console.log(image_id);
  } catch (error: any) {
    console.log(error);
  }
  return image_id;
}

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
