import axios from "axios";
import { ENV_CONFIG } from "./app-config";

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

export const NeuroAxiosV2 = axios.create({
  baseURL: "/api/v2",
  headers: {
    "Content-Type": "application/json",
    "X-API-Key": ENV_CONFIG.NEURO_API_KEY,
  },
  timeout: 10000,
});
