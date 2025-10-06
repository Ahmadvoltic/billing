import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useGetApiCredentials } from '../../lib/queries';
import { useSaveApiCredentials } from '../../lib/mutations';

const ApiKeysTab = () => {
  const [apiKey, setApiKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [webhookSecret, setWebhookSecret] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const { data: credentials, isLoading } = useGetApiCredentials();
  const saveCredentialsMutation = useSaveApiCredentials();

  useEffect(() => {
    if (credentials) {
      setApiKey(credentials.apiKey || '');
      setSecretKey(credentials.secretKey || '');
      setWebhookSecret(credentials.webhookSecret || '');
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  }, [credentials]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await saveCredentialsMutation.mutateAsync({
        apiKey,
        secretKey,
        webhookSecret
      });
      toast.success('API credentials saved successfully');
      setIsEditing(false);
    } catch (error) {
      toast.error(error.message || 'Failed to save API credentials');
    }
  };

  const handleCancel = () => {
    if (credentials) {
      setApiKey(credentials.apiKey || '');
      setSecretKey(credentials.secretKey || '');
      setWebhookSecret(credentials.webhookSecret || '');
      setIsEditing(false);
    }
  };

  if (isLoading) {
    return <div className="text-text-secondary">Loading API credentials...</div>;
  }

  return (
    <div className="max-w-2xl">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-text-primary">API Credentials</h2>
          {!isEditing && credentials && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 text-sm font-medium text-primary hover:bg-blue-50 rounded-lg"
            >
              Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium text-text-primary mb-1">
              API Key
            </label>
            <input
              type="text"
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-border-color rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="Enter your API key"
              required
            />
          </div>

          <div>
            <label htmlFor="secretKey" className="block text-sm font-medium text-text-primary mb-1">
              Secret Key
            </label>
            <input
              type="text"
              id="secretKey"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-border-color rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="Enter your secret key"
              required
            />
          </div>

          <div>
            <label htmlFor="webhookSecret" className="block text-sm font-medium text-text-primary mb-1">
              Webhook Secret
            </label>
            <input
              type="text"
              id="webhookSecret"
              value={webhookSecret}
              onChange={(e) => setWebhookSecret(e.target.value)}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-border-color rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="Enter your webhook secret"
              required
            />
          </div>

          {credentials && (
            <div className="pt-2">
              <p className="text-xs text-text-secondary">
                Last updated: {new Date(credentials.updatedAt).toLocaleString()}
                {credentials.updatedBy && ` by ${credentials.updatedBy.email}`}
              </p>
            </div>
          )}

          {isEditing && (
            <div className="flex gap-3 pt-4">
              {credentials && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary border border-border-color rounded-lg"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={saveCredentialsMutation.isPending}
                className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saveCredentialsMutation.isPending ? 'Saving...' : 'Save Credentials'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ApiKeysTab;
