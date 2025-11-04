import axios from "axios";
import { useAuthStore } from "../store";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const refreshToken = async () => {
  await axios.post(
    `${import.meta.env.VITE_BACKEND_API_URL}/auth/refresh`,
    {},
    {
      withCredentials: true,
    }
  );
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const headers = { ...originalRequest.headers };
        await refreshToken();
        return api.request({ ...originalRequest, headers });
      } catch (refreshError) {
        console.error("Error refreshing access token:", refreshError);
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
