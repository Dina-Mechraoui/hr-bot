import { clearAllCookies } from "@/utils/clearAllCookies";
import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

const getAuthHeaders = () => {
  const access = Cookies.get("access");
  return access ? { Authorization: `Bearer ${access}` } : {};
};

api.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    ...getAuthHeaders(),
  };
  return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use(
  response => response,
  error => {
    if (
      error.status === 401 &&
      error.response.data?.code === "token_not_valid"
    ) {
      clearAllCookies()
    }
  }
);
export default api;
