import axios from "axios";
const API = import.meta.env.VITE_API_URL;
axios.create({
  baseURL: API
})

// attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;