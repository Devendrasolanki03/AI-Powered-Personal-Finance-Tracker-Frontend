// import axios from 'axios';
// import { API_BASE_URL } from '../utils/constants';
// import { getToken, logout } from '../utils/token';

// // Create axios instance
// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Request interceptor - Add JWT token to every request
// api.interceptors.request.use(
//   (config) => {
//     const token = getToken();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor - Handle errors globally
// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     // Handle 401 Unauthorized - Token expired or invalid
//     if (error.response && error.response.status === 401) {
//       logout();
//       window.location.href = '/login';
//     }

//     // Handle 403 Forbidden
//     if (error.response && error.response.status === 403) {
//       console.error('Access forbidden');
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;
import axios from 'axios';
import { getToken, logout } from '../utils/token';

// ✅ Directly env variable use karo — constants.js pe depend mat raho
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8086';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      logout();
      window.location.href = '/login';
    }
    if (error.response?.status === 403) {
      console.error('Access forbidden');
    }
    return Promise.reject(error);
  }
);

export default api;