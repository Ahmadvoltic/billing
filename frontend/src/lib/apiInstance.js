import axios from 'axios';
import axiosInstance from './axiosInstance';

export class ApiError extends Error {
  constructor(data, statusText, message, statusCode) {
    console.log('apiError', data, statusText, message, statusCode);
    super(message);
    this.data = data;
    this.statusText = statusText;
    this.statusCode = statusCode;
  }
}

export const apiMethods = {
  get: 'GET',
  post: 'POST',
  put: 'PUT',
  delete: 'DELETE',
  patch: 'PATCH',
};

/**
 *
 * @param {string} endpoint
 * @param {string} method
 * @param {object} data - if get request, params can be passed as its property
 * @returns
 */
export const apiInstance = async (endpoint, method, data) => {
  let headers;

  if (data && data instanceof FormData) {
    headers = {
      'Content-Type': 'multipart/form-data',
    };
  } else {
    headers = {
      'Content-Type': 'application/json',
    };
  }

  try {
    let response;
    switch (method) {
      case 'GET':
        response = await axiosInstance.get(endpoint, {
          headers,
          params: data?.params,
        });
        break;
      case 'POST':
        response = await axiosInstance.post(endpoint, data, {
          headers,
        });
        break;
      case 'PUT':
        response = await axiosInstance.put(endpoint, data, { headers });
        break;
      case 'DELETE':
        response = await axiosInstance.delete(endpoint, { headers });
        break;
      case 'PATCH':
        response = await axiosInstance.patch(endpoint, data, {
          headers,
        });
        break;
      default:
        throw new Error('Unsupported HTTP method');
    }

    return response?.data;
  } catch (error) {
    console.error('API Error:', error);
    if (axios.isAxiosError(error) && error.response) {
      console.log('Response error:', error.response);

      throw new ApiError(
        error.response.data,
        error.response.data?.status || error.response.statusText,
        error.response.data?.error || error.response.data?.message || 'Something went wrong',
        error.response.status
      );
    } else {
      console.log('Network error:', error);
      throw new ApiError(
        {},
        'Network Error',
        'Something went wrong',
        500
      );
    }
  }
};
