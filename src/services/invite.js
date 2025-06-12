import { apiClient } from "./apiClient";

async function getInvites() {
  const response = await apiClient.get(`/invites/`);
  return response;
}

async function postInvite(invite) {
  const response = await apiClient.post(`/invites/`, invite);
  return response;
}

async function deleteInvite(code) {
  const response = await apiClient.delete(`/invites/${code}`);
  return response;
}

export { getInvites, postInvite, deleteInvite };
