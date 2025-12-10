import axios from "axios";

const API_URL = "https://todo-backend-2iud.onrender.com/api/tasks";   

export const getTasks = () => axios.get(API_URL);

export const createTask = (data) => axios.post(API_URL, data);

export const updateTask = (id, data) => axios.put(`${API_URL}/${id}`, data);

export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`);

export const getTaskById = (id) => axios.get(`${API_URL}/${id}`);
