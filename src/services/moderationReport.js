import { apiClient } from "./apiClient";

async function getModerationReports({
  limit = 20,
  offset = 0,
  status = "open",
}) {
  const response = await apiClient.get(
    `/moderation-reports/?limit=${limit}&offset=${offset}&status=${status}`
  );
  return response;
}

async function getModerationReportsByUserId({
  limit = 20,
  offset = 0,
  userId,
}) {
  const response = await apiClient.get(
    `/moderation-reports/?limit=${limit}&offset=${offset}&userId=${userId}`
  );
  return response;
}

async function getModerationReportsOnUserId({ userId }) {
  const response = await apiClient.get(
    `/moderation-reports/?reportedUser=${userId}`
  );
  return response;
}

async function getModerationReport(id) {
  const response = await apiClient.get(`/moderation-reports/${id}`);
  return response;
}

async function postModerationReport(moderationReport) {
  const response = await apiClient.post(
    `/moderation-reports/`,
    moderationReport
  );
  return response;
}

async function putModerationReport(id, moderationReport) {
  const response = await apiClient.put(
    `/moderation-reports/${id}`,
    moderationReport
  );
  return response;
}

async function deleteModerationReport(id) {
  const response = await apiClient.delete(`/moderation-reports/${id}`);
  return response;
}

export {
  getModerationReport,
  getModerationReports,
  getModerationReportsByUserId,
  getModerationReportsOnUserId,
  postModerationReport,
  putModerationReport,
  deleteModerationReport,
};
