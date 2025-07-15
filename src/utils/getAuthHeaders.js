// src/utils/getAuthHeaders.js
import Cookies from 'js-cookie';

export const getAuthHeaders = () => {
  const token = Cookies.get('access');
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};