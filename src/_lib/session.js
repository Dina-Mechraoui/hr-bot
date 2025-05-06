// _lib/session.js
export async function authenticated(accessToken, refreshToken) {
    try {
      const payload = parseJwt(accessToken); 
      if (!payload || isExpired(payload)) throw new Error("Expired token");
  
      return payload;
    } catch {
      const newAccess = await refreshToken(refreshToken);
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
  