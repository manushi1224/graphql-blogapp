const graphqlAssetAPI = process.env.NEXT_PUBLIC_HYGRAPH_ASSET_API;
const customGraphToken = process.env.NEXT_PUBLIC_HYGRAPH_TOKEN;

export async function uploadAsset(form: File) {
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
    console.log(image_id);
  } catch (error: any) {
    console.log(error);
  }
  return image_id;
}
