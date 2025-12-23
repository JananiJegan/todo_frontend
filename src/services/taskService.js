import axios from "axios";

const API_URL = "https://todo-backend1-vr4j.onrender.com/api/tasks";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getTasks = () =>
  axios.get(API_URL, { headers: getAuthHeader() });

export const createTask = (data) =>
  axios.post(API_URL, data, { headers: getAuthHeader() });

export const updateTask = (id, data) =>
  axios.put(`${API_URL}/${id}`, data, { headers: getAuthHeader() });

export const deleteTask = (id) =>
  axios.delete(`${API_URL}/${id}`, { headers: getAuthHeader() });

export const getTaskById = (id) =>
  axios.get(`${API_URL}/${id}`, { headers: getAuthHeader() });
