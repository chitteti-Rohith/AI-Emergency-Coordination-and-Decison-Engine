import axios from "axios";

// Axios client for communicating with the Flask backend.
const apiClient = axios.create({
  baseURL: "https://ai-emergency-backend-q40q.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;