import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Create the instance with a base URL
const axiosInstance = axios.create({
  baseURL: 'https://eurbin.vercel.app', // Base API URL
});

// Add a request interceptor to attach the token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle expired tokens
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token'); // Clear the token
      alert('Session expired. Please login again.');
      window.location.href = '/Login'; // Redirect to Login page
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
