import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("dt-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token expiration
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("dt-token");
      localStorage.removeItem("dt-user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: (full_name, email, password) =>
    apiClient.post("/users/register", { full_name, email, password }),

  login: (email, password) =>
    apiClient.post("/users/login", { email, password }),

  logout: () => {
    localStorage.removeItem("dt-token");
    localStorage.removeItem("dt-user");
    localStorage.removeItem("dt-theme");
  },
};

// Goal API calls
export const goalAPI = {
  create: (payload) =>
    apiClient.post("/goals/create", payload),

  getAll: (userId) =>
    apiClient.get(`/goals/${userId}`),

  complete: (goalId) =>
    apiClient.put(`/goals/complete/${goalId}`),

  update: (goalId, title, category) =>
    apiClient.put(`/goals/edit/${goalId}`, { title, category }),

  delete: (goalId) =>
    apiClient.delete(`/goals/delete/${goalId}`),
};

// Habit API calls
export const habitAPI = {
  create: (payload) =>
    apiClient.post("/habits/create", payload),

  getAll: (userId) =>
    apiClient.get(`/habits/${userId}`),

  update: (habitId, payload) =>
    apiClient.put(`/habits/edit/${habitId}`, payload),

  delete: (habitId) =>
    apiClient.delete(`/habits/delete/${habitId}`),

  checkIn: (habitId, payload = {}) =>
    apiClient.post(`/habits/checkin/${habitId}`, payload),

  heatmap: (userId, days = 120) =>
    apiClient.get(`/habits/heatmap/${userId}?days=${days}`),
};

export default apiClient;
