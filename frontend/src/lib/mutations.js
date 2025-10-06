import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiInstance, apiMethods } from './apiInstance';
import { API_ENDPOINTS } from './constants';

export const useLogin = () => {
  return useMutation({
    mutationFn: async ({ email, password }) => {
      const response = await apiInstance(
        API_ENDPOINTS.AUTH.LOGIN,
        apiMethods.post,
        { email, password }
      );
      return response;
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await apiInstance(
        API_ENDPOINTS.AUTH.LOGOUT,
        apiMethods.post
      );
      return response;
    },
    onSuccess: () => {
      queryClient.clear();
    },
  });
};

export const useCreateEmailAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await apiInstance(
        API_ENDPOINTS.EMAIL_ACCOUNTS.CREATE,
        apiMethods.post,
        data
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emailAccounts'] });
    },
  });
};

export const useUpdateEmailAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await apiInstance(
        API_ENDPOINTS.EMAIL_ACCOUNTS.UPDATE(id),
        apiMethods.put,
        data
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emailAccounts'] });
    },
  });
};

export const useDeleteEmailAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const response = await apiInstance(
        API_ENDPOINTS.EMAIL_ACCOUNTS.DELETE(id),
        apiMethods.delete
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emailAccounts'] });
    },
  });
};

export const useCreateCustomField = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await apiInstance(
        API_ENDPOINTS.CUSTOM_FIELDS.CREATE,
        apiMethods.post,
        data
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customFields'] });
    },
  });
};

export const useDeleteCustomField = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const response = await apiInstance(
        API_ENDPOINTS.CUSTOM_FIELDS.DELETE(id),
        apiMethods.delete
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customFields'] });
    },
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await apiInstance(
        API_ENDPOINTS.USERS.CREATE,
        apiMethods.post,
        data
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await apiInstance(
        API_ENDPOINTS.USERS.UPDATE(id),
        apiMethods.patch,
        data
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });
};

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, role }) => {
      const response = await apiInstance(
        API_ENDPOINTS.USERS.UPDATE_ROLE(id),
        apiMethods.patch,
        { role }
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const response = await apiInstance(
        API_ENDPOINTS.USERS.DELETE(id),
        apiMethods.delete
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const useSaveApiCredentials = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await apiInstance(
        API_ENDPOINTS.API_KEYS.CREATE,
        apiMethods.post,
        data
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apiCredentials'] });
    },
  });
};
