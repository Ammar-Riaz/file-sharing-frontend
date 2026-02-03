import axios from "axios";

/**
 * Standard Axios instance for the application.
 * In a production app, the baseURL would come from environment variables.
 */
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Required for cookies (if using JWT in cookies)
});

// Request interceptor (useful for adding auth tokens)
api.interceptors.request.use(
  (config) => {
    // You can add logic here to add tokens to headers if needed
    // const token = localStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor (useful for global error handling)
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Global error handling logic
    const message =
      error.response?.data?.message || "An unexpected error occurred";
    return Promise.reject(new Error(message));
  },
);

export default api;
