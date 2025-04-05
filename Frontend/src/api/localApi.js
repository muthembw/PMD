import axios from "axios";

const api = axios.create({
  baseURL: "https://pmd-backend.onrender.com",
});
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {  // Fixed the typo: 'tone' -> 'token'
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default api;
