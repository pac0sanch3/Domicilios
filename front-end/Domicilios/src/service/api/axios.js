import axios from "axios";

export const axiosCliente = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosCliente.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosCliente.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
