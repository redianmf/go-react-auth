import axios from "axios";
import { IRenewToken } from "../types/interfaces";
import { REFRESH_TOKEN_URL } from "./endpoints";
import { renewToken } from "./renewToken";

// Create axios instance
export const API = axios.create({
  baseURL: process.env.VITE_SERVER_BASE_URL,
});

let refreshTokenFunction: Promise<IRenewToken> | null;

API.interceptors.request.use(
  (config) => {
    const accessToken = localStorage?.accessToken;
    if (accessToken) {
      config.headers["Authorization"] = "Bearer " + accessToken;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

API.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err?.config;
    const accessToken = localStorage?.accessToken;
    const refreshToken = localStorage?.refreshToken;
    const errCode = err?.response?.status;

    if (!accessToken || errCode !== 401) return Promise.reject(err);

    // logout if refresh token compromised
    if (errCode === 401 && originalConfig.url === REFRESH_TOKEN_URL) {
      localStorage.clear();
      API.defaults.headers.common["Authorization"] = "";
      window.location.href = "/auth";
    }

    try {
      // Refreshing token
      if (!refreshTokenFunction) {
        refreshTokenFunction = renewToken(refreshToken);
      }

      const { newAccessToken, newRefreshToken } = await refreshTokenFunction;

      // Set headers
      API.defaults.headers.common["Authorization"] = "Bearer " + newAccessToken;

      // Set localstorage
      localStorage.accessToken = newAccessToken;
      localStorage.refreshToken = newRefreshToken;

      // Retry error request
      try {
        return await API.request(originalConfig);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (error?.response?.status === 401) throw error;
        }
      }
    } catch (error) {
      localStorage.clear();
      API.defaults.headers.common["Authorization"] = "";
    } finally {
      refreshTokenFunction = null;
    }
  }
);
