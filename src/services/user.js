import { apiClient } from "./apiClient";

async function getMinisByUsername(username) {
  const response = await apiClient.get(`/users/${username}/minis?thumbnails=true`);
  return response;
}

async function getUserByMe() {
  const response = await apiClient.get(`/users/me`);
  return response;
}

async function getUserByUsername(username) {
  const response = await apiClient.get(`/users/${username}`);
  return response;
}

async function putUser(id, user) {
  const response = await apiClient.put(`/users/${id}`, user);
  return response;
}

export { getMinisByUsername, getUserByMe, getUserByUsername, putUser };