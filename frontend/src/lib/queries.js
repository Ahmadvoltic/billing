import { useQuery } from '@tanstack/react-query';
import { apiInstance, apiMethods } from './apiInstance';
import { API_ENDPOINTS } from './constants';

export const useGetAllEmailAccounts = (filters = {}) => {
  return useQuery({
    queryKey: ['emailAccounts', filters],
    queryFn: async () => {
      const params = {};

      if (filters.search) {
        params.search = filters.search;
      }

      if (filters.status && filters.status.length > 0) {
        params.status = filters.status.join(',');
      }

      if (filters.sources && filters.sources.length > 0) {
        params.sources = filters.sources.join(',');
      }

      if (filters.startDate) {
        params.startDate = filters.startDate;
      }

      if (filters.endDate) {
        params.endDate = filters.endDate;
      }

      const response = await apiInstance(
        API_ENDPOINTS.EMAIL_ACCOUNTS.GET_ALL,
        apiMethods.get,
        { params }
      );

      return response;
    },
  });
};

export const useGetEmailAccountById = (id) => {
  return useQuery({
    queryKey: ['emailAccount', id],
    queryFn: async () => {
      const response = await apiInstance(
        API_ENDPOINTS.EMAIL_ACCOUNTS.GET_BY_ID(id),
        apiMethods.get
      );
      return response;
    },
    enabled: !!id,
  });
};

export const useGetAllCustomFields = () => {
  return useQuery({
    queryKey: ['customFields'],
    queryFn: async () => {
      const response = await apiInstance(
        API_ENDPOINTS.CUSTOM_FIELDS.GET_ALL,
        apiMethods.get
      );
      return response;
    },
  });
};

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const response = await apiInstance(
        API_ENDPOINTS.AUTH.ME,
        apiMethods.get
      );
      return response;
    },
    retry: false,
  });
};

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await apiInstance(
        API_ENDPOINTS.USERS.GET_ALL,
        apiMethods.get
      );
      return response;
    },
  });
};

export const useGetApiCredentials = () => {
  return useQuery({
    queryKey: ['apiCredentials'],
    queryFn: async () => {
      const response = await apiInstance(
        API_ENDPOINTS.API_KEYS.GET_ALL,
        apiMethods.get
      );
      return response;
    },
  });
};
