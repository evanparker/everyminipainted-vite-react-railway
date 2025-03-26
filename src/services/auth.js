import { apiClient } from "./apiClient";

async function postLogin(loginInfo) {
  const response = await apiClient.post(`/auth/login`, loginInfo);
  return response;
}

async function postSignup(signupInfo) {
  const response = await apiClient.post(`/auth/signup`, signupInfo);
  return response;
}

async function postLogout() {
  const response = await apiClient.post(`/auth/logout/`);
  return response;
}

export { postLogin, postSignup, postLogout };