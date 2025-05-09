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
  const response = await apiClient.post(`/auth/logout`);
  return response;
}

async function putPassword(passwordInfo) {
  const response = await apiClient.put(`/auth/password`, passwordInfo);
  return response;
}

async function postForgotPassword(emailInfo) {
  const response = await apiClient.post(`/auth/forgotpassword`, emailInfo);
  return response;
}

async function postResetPassword(info) {
  const response = await apiClient.post(`/auth/resetpassword`, info);
  return response;
}

export {
  postLogin,
  postSignup,
  postLogout,
  putPassword,
  postForgotPassword,
  postResetPassword,
};
