import axios from "axios";

const API_URL = "https://todo-backend1-vr4j.onrender.com/api/auth";

const setToken = (token) => {
  localStorage.setItem("token", token);
};

const removeToken = () => {
  localStorage.removeItem("token");
};

const getToken = () => localStorage.getItem("token");

export const signup = async (userData) => {
  const res = await axios.post(`${API_URL}/signup`, userData);
  return res.data;
};

export const login = async (credentials) => {
  const res = await axios.post(`${API_URL}/login`, credentials);

  if (res.data.token) {
    setToken(res.data.token);
  }

  return res.data;
};

export const logout = () => {
  removeToken();
};

export const isAuthenticated = () => !!getToken();

