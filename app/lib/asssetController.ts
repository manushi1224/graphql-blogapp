import client from "./client";
import { deleteAssetById } from "../graphql/mutation";

const graphqlAssetAPI = process.env.NEXT_PUBLIC_HYGRAPH_ASSET_API;
const customGraphToken = process.env.NEXT_PUBLIC_HYGRAPH_TOKEN;

export async function uploadAsset(form: FormData) {
  let image_id;
  try {
    const response = await fetch(graphqlAssetAPI as string, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${customGraphToken}`,
      },
      body: form,
    });
    const imageUploaded = await response.json();

    image_id = imageUploaded.id;
  } catch (error: any) {
    console.log(error);
  }
  return image_id;
}

export async function deleteAsset(imageId: string) {
  const response = await client.request(deleteAssetById, { id: imageId });
}
