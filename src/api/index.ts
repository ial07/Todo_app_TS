// axios
import axios from "axios";
import { APIConfiguration } from "../config/api.config";

export const apiInstance = axios.create({
  baseURL: APIConfiguration.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

apiInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});