import type { ImageAddressResponse } from "@customTypes/image.types";
import blogApi from "../api/blogApi";

const IMAGES_PREFIX = "/api/images";

export async function createImage(uploadFile: File) {
  const formData = new FormData();
  formData.append("uploadFile", uploadFile);
  const { data } = await blogApi.post(IMAGES_PREFIX, formData);
  return data;
}

export async function getImageUrl(imageId: number) {
  const { data } = await blogApi.get(`${IMAGES_PREFIX}/url/${imageId}`);
  return data as ImageAddressResponse;
}
