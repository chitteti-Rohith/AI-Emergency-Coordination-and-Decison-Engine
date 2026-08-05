import axios from "axios";

// Axios client for communicating with the Flask backend.
const apiClient = axios.create({
  baseURL: "http://127.0.0.1:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;