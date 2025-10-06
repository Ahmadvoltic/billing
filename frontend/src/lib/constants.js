const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000/api';

const API_ENDPOINTS = Object.freeze({
  AUTH: Object.freeze({
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
  }),
  EMAIL_ACCOUNTS: Object.freeze({
    GET_ALL: '/email-accounts',
    GET_BY_ID: (id) => `/email-accounts/${id}`,
    CREATE: '/email-accounts',
    UPDATE: (id) => `/email-accounts/${id}`,
    DELETE: (id) => `/email-accounts/${id}`,
  }),
  CUSTOM_FIELDS: Object.freeze({
    GET_ALL: '/custom-fields',
    CREATE: '/custom-fields',
    DELETE: (id) => `/custom-fields/${id}`,
  }),
  USERS: Object.freeze({
    GET_ALL: '/users',
    CREATE: '/users',
    UPDATE: (id) => `/users/${id}`,
    UPDATE_ROLE: (id) => `/users/${id}/role`,
    DELETE: (id) => `/users/${id}`,
  }),
  API_KEYS: Object.freeze({
    GET_ALL: '/api-keys',
    CREATE: '/api-keys',
    DELETE: (id) => `/api-keys/${id}`,
    TOGGLE: (id) => `/api-keys/${id}/toggle`,
  }),
});

export { API_ENDPOINTS, BASE_URL };
