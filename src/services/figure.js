import { apiClient } from "./apiClient";

async function getFigures({ limit = 20, offset = 0 }) {
  const response = await apiClient.get(
    `/figures/?limit=${limit}&offset=${offset}`
  );
  return response;
}

async function getFiguresBySearch(search, { limit = 20, offset = 0 }) {
  const response = await apiClient.get(
    `/figures/search?search=${search}&limit=${limit}&offset=${offset}`
  );
  return response;
}

async function getFigure(id) {
  const response = await apiClient.get(`/figures/${id}`);
  return response;
}

async function getFigureMinis(id, { limit = 20, offset = 0 }) {
  const response = await apiClient.get(
    `/figures/${id}/minis?limit=${limit}&offset=${offset}`
  );
  return response;
}

async function postFigure(figure) {
  try {
    const response = await apiClient.post(`/figures/`, figure);
    return response;
  } catch (e) {
    console.log(e);
  }
}

async function putFigure(id, figure) {
  const response = await apiClient.put(`/figures/${id}`, figure);
  return response;
}

async function deleteFigure(id) {
  const response = await apiClient.delete(`/figures/${id}`);
  return response;
}

export {
  getFigure,
  getFigures,
  postFigure,
  putFigure,
  deleteFigure,
  getFiguresBySearch,
  getFigureMinis,
};
