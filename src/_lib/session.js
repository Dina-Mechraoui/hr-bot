import { clearAllCookies } from "@/utils/clearAllCookies";

// _lib/session.js
export async function authenticated(accessToken, refreshAccessToken) {
    try {
      const payload = parseJwt(accessToken); 
      if (!payload || isExpired(payload)) clearAllCookies();
  
      return payload;
    } catch {
      const newAccess = await refreshAccessToken(refreshToken);
      return newAccess;
    }
  }
  
  function parseJwt(token) {
    try {
      const base64 = token.split('.')[1];
      return JSON.parse(atob(base64));
    } catch {
      return null;
    }
  }
  
  function isExpired(payload) {
    const now = Date.now() / 1000;
    return payload.exp < now;
  }
  