const API_URL = 'http://localhost:5000/api';

export const emailAccountsAPI = {
  // Get all email accounts with optional filters
  getAll: async (filters = {}) => {
    try {
      const params = new URLSearchParams();

      if (filters.search) {
        params.append('search', filters.search);
      }

      if (filters.status && filters.status.length > 0) {
        params.append('status', filters.status.join(','));
      }

      if (filters.sources && filters.sources.length > 0) {
        params.append('sources', filters.sources.join(','));
      }

      if (filters.startDate) {
        params.append('startDate', filters.startDate);
      }

      if (filters.endDate) {
        params.append('endDate', filters.endDate);
      }

      const queryString = params.toString();
      const url = `${API_URL}/email-accounts${queryString ? `?${queryString}` : ''}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch email accounts');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching email accounts:', error);
      throw error;
    }
  },

  // Get single email account
  getById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/email-accounts/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch email account');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching email account:', error);
      throw error;
    }
  },

  // Create new email account
  create: async (data) => {
    try {
      const response = await fetch(`${API_URL}/email-accounts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to create email account');
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating email account:', error);
      throw error;
    }
  },

  // Update email account
  update: async (id, data) => {
    try {
      const response = await fetch(`${API_URL}/email-accounts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to update email account');
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating email account:', error);
      throw error;
    }
  },

  // Delete email account
  delete: async (id) => {
    try {
      const response = await fetch(`${API_URL}/email-accounts/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete email account');
      }
      return await response.json();
    } catch (error) {
      console.error('Error deleting email account:', error);
      throw error;
    }
  },
};
