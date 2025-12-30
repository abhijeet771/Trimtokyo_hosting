const API_BASE = "https://trimtokyo-hosting-1.onrender.com";

export const apiRequest = async (endpoint, method = "GET", data = null, token = null) => {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const options = { method, headers };
  if (data) options.body = JSON.stringify(data);

  const res = await fetch(`${API_BASE}${endpoint}`, options);
  return await res.json();
};
