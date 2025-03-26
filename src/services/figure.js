import { apiClient } from "./apiClient";

async function getFigures() {
  const response = await apiClient.get(`/figures/?thumbnails="true"`);
  return response;
}

async function getFigure(id) {
  const response = await apiClient.get(`/figures/${id}`);
  return response;
}

async function postFigure(figure) {
  const response = await apiClient.post(`/figures/`, figure);
  return response;
}

async function putFigure(id, figure) {
  const response = await apiClient.put(`/figures/${id}`, figure);
  return response;
}

async function deleteFigure(id) {
  const response = await apiClient.delete(`/figures/${id}`);
  return response;
}

export { getFigure, getFigures, postFigure, putFigure, deleteFigure };