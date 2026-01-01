import { getToken, removeToken } from "./auth.js";

export const checkAuth = () => {
  const token = getToken();

  if (!token) {
    alert("Please log in first!");
    window.location.href = "login.html";
  }
};

export const logout = () => {
  removeToken();
  localStorage.removeItem("role");
  localStorage.removeItem("username");
  window.location.href = "login.html";
};
