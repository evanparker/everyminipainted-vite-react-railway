import { apiClient } from "./apiClient";

async function getManufacturers() {
  const response = await apiClient.get(`/manufacturers/?thumbnails="true"`);
  return response;
}

async function getManufacturer(id) {
  const response = await apiClient.get(`/manufacturers/${id}`);
  return response;
}

async function getManufacturerFigures(id) {
  const response = await apiClient.get(`/manufacturers/${id}/figures`);
  return response;
}

async function getManufacturersBySearch(query) {
  const response = await apiClient.get(`/manufacturers/search?query=${query}`);
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

export {
  getManufacturer,
  getManufacturers,
  getManufacturerFigures,
  getManufacturersBySearch,
  postManufacturer,
  putManufacturer,
  deleteManufacturer,
};
