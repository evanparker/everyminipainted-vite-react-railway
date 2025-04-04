import { apiClient } from "./apiClient";

async function getManufacturers({ limit = 20, offset = 0 }) {
  const response = await apiClient.get(
    `/manufacturers/?limit=${limit}&offset=${offset}`
  );
  return response;
}

async function getManufacturer(id) {
  const response = await apiClient.get(`/manufacturers/${id}`);
  return response;
}

async function getManufacturerFigures(id, { limit = 20, offset = 0 }) {
  const response = await apiClient.get(
    `/manufacturers/${id}/figures?limit=${limit}&offset=${offset}`
  );
  return response;
}

async function getManufacturersBySearch(search, { limit = 20, offset = 0 }) {
  const response = await apiClient.get(
    `/manufacturers/search?search=${search}&limit=${limit}&offset=${offset}`
  );
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
