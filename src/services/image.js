import { apiClient } from "./apiClient";

async function getImage(id) {
  const response = await apiClient.get(`/images/${id}`);
  return response;
}

async function postImage(image) {
  const response = await apiClient.post(`/images/`, image);
  return response;
}

export { getImage, postImage };