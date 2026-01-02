import { checkAuth, logout } from "./checkauth.js";

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const guestNav = document.getElementById("nav-guest");
  const authNav = document.getElementById("nav-auth");
  const usernameEl = document.getElementById("navbar-username");

  if (token && username) {
    guestNav.style.display = "none";
    authNav.style.display = "flex";
    usernameEl.textContent = `Hello, ${username}`;
  } else {
    guestNav.style.display = "flex";
    authNav.style.display = "none";
  }
  checkAuth();
});
window.logout = logout;
