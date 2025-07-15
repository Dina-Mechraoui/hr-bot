import api from "@/api/base";

export const apiRequest = async ({ method, url, data = {}, params = {} }) => {
  try {
    const response = await api({
      method,
      url,
      data,
      params,
    });

    return response.data;
  } catch (error) {
    console.error("API Request Error:", error.response?.data || error);
    throw error;
  }
};