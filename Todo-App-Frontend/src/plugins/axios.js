import { AuthData } from "@/composables/lib/type";
import axios from "axios";
// Get the base URL from the environment variable or use a fallback
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8089";

// Create an Axios instance
const $api = axios.create({
  baseURL, // Use the resolved base URL
  timeout: 10000, // Request timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
$api.interceptors.request.use(
  (config) => {
    // Add authorization token if available
    const auth_data = JSON.parse(localStorage.getItem("auth_data"));
    if (auth_data) {
      config.headers.Authorization = `Bearer ${auth_data.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
$api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized! Redirecting to login...");
      // Optionally redirect to login page
      window.location.href = "/dang-nhap";
    }
    return Promise.reject(error);
  }
);

export default $api;
