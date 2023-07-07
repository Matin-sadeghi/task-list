import axios from "axios";

const SERVER_URL = "http://localhost:9000";

export const getAllTasks = () => {
  const url = `${SERVER_URL}/tasks`;
  return axios.get(url);
};

export const getTask =  (taskId) => {
  const url = `${SERVER_URL}/tasks/${taskId}`;
  return axios.get(url);
};

export const createTask = (task) => {
  const url = `${SERVER_URL}/tasks`;
  return axios.post(url, task);
};

export const updateTask = (task, taskId) => {
  const url = `${SERVER_URL}/tasks/${taskId}`;
  return axios.put(url, task);
};

export const deleteTask = (taskId) => {
    const url = `${SERVER_URL}/tasks/${taskId}`;
    return axios.delete(url);
  };
  
