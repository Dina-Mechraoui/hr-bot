import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export const useCurrentUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const cookie = Cookies.get("user");
      const parsed = cookie ? JSON.parse(cookie) : null;
      if (parsed) setUser(parsed);
    } catch (err) {
      console.error("Failed to parse user cookie:", err);
    }
  }, []);

  return user;
};