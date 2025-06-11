import axios from "axios";
import { ENV_CONFIG } from "./app-config";

export const NeuroAxiosV2 = axios.create({
  baseURL: "/api/v2",
  headers: {
    "Content-Type": "application/json",
    "X-API-Key": ENV_CONFIG.NEURO_API_KEY,
  },
});
