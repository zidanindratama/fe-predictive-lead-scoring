import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const BASE_URL = "https://be-predictive-lead-scoring.vercel.app";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAccessToken = (token: string | null) => {
  if (token) {
    Cookies.set("accessToken", token);
  } else {
    Cookies.remove("accessToken");
  }
};

export const getAccessToken = () => {
  return Cookies.get("accessToken");
};

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (typeof window !== "undefined") {
      config.headers["x-frontend-domain"] = window.location.origin;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (originalRequest.url?.includes("/auth/refresh")) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        const currentDomain =
          typeof window !== "undefined" ? window.location.origin : "";

        const { data } = await axios.post(
          `${BASE_URL}/auth/refresh`,
          {},
          {
            withCredentials: true,
            headers: {
              "x-frontend-domain": currentDomain,
            },
          }
        );

        const newAccessToken = data.data.accessToken;

        setAccessToken(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        if (!originalRequest.headers["x-frontend-domain"] && currentDomain) {
          originalRequest.headers["x-frontend-domain"] = currentDomain;
        }

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        setAccessToken(null);

        if (
          typeof window !== "undefined" &&
          window.location.pathname.startsWith("/dashboard")
        ) {
          window.location.href = "/auth/sign-in";
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
