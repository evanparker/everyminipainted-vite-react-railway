import { apiClient } from "./apiClient";

async function getMinisByUsername(username, { limit = 20, offset = 0 }) {
  const response = await apiClient.get(
    `/users/${username}/minis?limit=${limit}&offset=${offset}`
  );
  return response;
}

async function getUserByMe() {
  const token = JSON.parse(localStorage.getItem("token"));
  if (!token) {
    return {};
  }
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

async function addFavorite(id) {
  const response = await apiClient.put(`/users/me/setfavorite`, {
    id,
    value: true,
  });
  return response;
}

async function removeFavorite(id) {
  const response = await apiClient.put(`/users/me/setfavorite`, {
    id,
    value: false,
  });
  return response;
}

export {
  getMinisByUsername,
  getUserByMe,
  getUserByUsername,
  putUser,
  addFavorite,
  removeFavorite,
};
