import { apiClient } from "./apiClient";

async function getMinis({ limit = 20, offset = 0 }) {
  const response = await apiClient.get(
    `/minis/?limit=${limit}&offset=${offset}`
  );
  return response;
}

async function getMini(id) {
  const response = await apiClient.get(`/minis/${id}`);
  return response;
}

async function postMini(mini) {
  const response = await apiClient.post(`/minis/`, mini);
  return response;
}

async function putMini(id, mini) {
  const response = await apiClient.put(`/minis/${id}`, mini);
  return response;
}

async function deleteMini(id) {
  const response = await apiClient.delete(`/minis/${id}`);
  return response;
}

async function getMinisBySearch(search, { limit = 20, offset = 0 }) {
  const response = await apiClient.get(
    `/minis/search?search=${search}&limit=${limit}&offset=${offset}`
  );
  return response;
}

export { getMini, getMinis, postMini, putMini, deleteMini, getMinisBySearch };
