import axios from "axios";

const API_URL = "https://todo-backend1-vr4j.onrender.com/api/auth";

const setToken = (token) => {
  localStorage.setItem("token", token);
};

const removeToken = () => {
  localStorage.removeItem("token");
};

const getToken = () => localStorage.getItem("token");

const signup = async (userData) => {
  const res = await axios.post(`${API_URL}/signup`, userData);
  return res.data;
};

const login = async (credentials) => {
  const res = await axios.post(`${API_URL}/login`, credentials);

  if (res.data.token) {
    setToken(res.data.token);
  }

  return res.data;
};

const logout = () => {
  removeToken();
};

const isAuthenticated = () => !!getToken();

export default {
  signup,
  login,
  logout,
  isAuthenticated,
  getToken,
};