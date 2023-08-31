import axios from "axios";
import { BASE_URL_AUTHORIZATION } from "../hooks/config";

export const instance = axios.create();
instance.defaults.timeout = 30000;

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    "accessToken"
  )}`;
  return config;
});

instance.interceptors.response.use(
  (config) => {
    return config;
  },

  async (error) => {
    if (error.code === "ECONNABORTED") {
      window.location.href = "/error/504";
      throw error;
    }
    const originalRequest = { ...error.config };
    originalRequest._isRetry = true;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      try {
        const resp = await axios.post(
          `${BASE_URL_AUTHORIZATION}/authorization/refresh`,
          {
            token: localStorage.getItem("refreshToken"),
          }
        );

        localStorage.setItem("accessToken", resp.data.accessToken);
        localStorage.setItem("refreshToken", resp.data.refreshToken);

        return instance.request(originalRequest);
      } catch (error) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        console.log("AUTH ERROR");
      }
    }

    throw error;
  }
);
