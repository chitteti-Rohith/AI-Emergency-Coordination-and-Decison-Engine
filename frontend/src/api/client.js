import axios from "axios";

// One shared Axios instance for the whole app, pointed at the Flask backend.
// Centralizing this means if the backend URL ever changes (e.g. deploying
// to a real server instead of localhost), we change it in exactly one place.
const apiClient = axios.create({
  baseURL: "http://127.0.0.1:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
