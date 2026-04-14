import axios from "axios";
import { getStoredToken } from "./session";

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

API.interceptors.request.use((config) => {
  const token = getStoredToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;
