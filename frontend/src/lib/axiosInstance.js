import axios from 'axios';
import { BASE_URL } from './constants';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (axios.isAxiosError(error) && error.response) {
      return Promise.reject({
        data: error.response.data,
        statusText: error.response.data?.status || error.response.statusText,
        message: error.response.data?.message || 'Something went wrong',
        statusCode: error.response.status,
      });
    } else {
      return Promise.reject({
        data: {},
        statusText: 'Network Error',
        message: 'Something went wrong',
        statusCode: 500,
      });
    }
  }
);

export default axiosInstance;
