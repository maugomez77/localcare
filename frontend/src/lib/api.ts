import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "https://localcare-api.onrender.com";

const api = axios.create({
  baseURL: API_URL,
});

export default api;
