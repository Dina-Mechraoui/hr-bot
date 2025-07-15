import Cookies from "js-cookie";

export const setAuthCookies = ({ access, refresh, user }) => {
  const options = { secure: true, sameSite: "Strict" };
  Cookies.set("access", access, options);
  Cookies.set("refresh", refresh, options);
  Cookies.set("role", user.role, options);
  Cookies.set("profile_review", user.status, options);
  Cookies.set("user", JSON.stringify(user), options);
};