import axios from "axios";

const SERVER_URL = "http://localhost:9000";

export const getAllMembers = () => {
  const url = `${SERVER_URL}/users`;
  return axios.get(url);
};

export const getMember = (userId) => {
  const url = `${SERVER_URL}/users/${userId}`;
  return axios.get(url);
};

export const createMember = (user) => {
  const url = `${SERVER_URL}/users`;
  return axios.post(url, user);
};

export const updateMember = (user, userId) => {
  const url = `${SERVER_URL}/users/${userId}`;
  return axios.put(url, user);
};

export const deleteMember = (userId) => {
  const url = `${SERVER_URL}/users/${userId}`;
  return axios.delete(url);
};
