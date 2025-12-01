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

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
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

      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = "Bearer " + token;
            }
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

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

        axiosInstance.defaults.headers.common["Authorization"] =
          "Bearer " + newAccessToken;

        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        if (!originalRequest.headers["x-frontend-domain"] && currentDomain) {
          originalRequest.headers["x-frontend-domain"] = currentDomain;
        }

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        setAccessToken(null);

        if (
          typeof window !== "undefined" &&
          window.location.pathname.startsWith("/dashboard")
        ) {
          window.location.href = "/auth/sign-in";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
