import { apiClient } from "./apiClient";

async function getManufacturers() {
  const response = await apiClient.get(`/manufacturers/?thumbnails="true"`);
  return response;
}

async function getManufacturer(id) {
  const response = await apiClient.get(`/manufacturers/${id}`);
  return response;
}

async function postManufacturer(manufacturer) {
  const response = await apiClient.post(`/manufacturers/`, manufacturer);
  return response;
}

async function putManufacturer(id, manufacturer) {
  const response = await apiClient.put(`/manufacturers/${id}`, manufacturer);
  return response;
}

async function deleteManufacturer(id) {
  const response = await apiClient.delete(`/manufacturers/${id}`);
  return response;
}

export { getManufacturer, getManufacturers, postManufacturer, putManufacturer, deleteManufacturer };