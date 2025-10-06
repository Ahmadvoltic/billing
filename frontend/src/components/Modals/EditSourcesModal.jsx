import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useUpdateEmailAccount } from '../../lib/mutations';

const EditSourcesModal = ({ isOpen, onClose, currentSources, itemId }) => {
  const [sources, setSources] = useState({
    Slack: false,
    WhatsApp: false,
    Email: false,
  });

  const updateEmailAccountMutation = useUpdateEmailAccount();
  const availableSources = ['Slack', 'WhatsApp', 'Email'];

  useEffect(() => {
    if (currentSources && isOpen) {
      const sourcesObj = {
        Slack: currentSources.includes('Slack'),
        WhatsApp: currentSources.includes('WhatsApp'),
        Email: currentSources.includes('Email'),
      };
      setSources(sourcesObj);
    }
  }, [currentSources, isOpen]);

  const handleToggle = (source) => {
    setSources(prev => ({
      ...prev,
      [source]: !prev[source],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedSources = Object.keys(sources).filter(key => sources[key]);
    try {
      await updateEmailAccountMutation.mutateAsync({
        id: itemId,
        data: { sources: selectedSources }
      });
      toast.success('Sources updated successfully!');
      onClose();
    } catch (error) {
      console.error('Failed to update sources:', error);
      toast.error('Failed to update sources');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-text-primary">Edit Sources</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-3">
            <p className="text-sm text-text-secondary mb-3">
              Select the sources for this customer:
            </p>

            {availableSources.map((source) => (
              <div key={source} className="flex items-center">
                <input
                  type="checkbox"
                  id={`source-${source}`}
                  checked={sources[source]}
                  onChange={() => handleToggle(source)}
                  className="w-4 h-4 text-primary border-border-color rounded focus:ring-2 focus:ring-primary"
                />
                <label
                  htmlFor={`source-${source}`}
                  className="ml-3 text-sm font-medium text-text-primary cursor-pointer"
                >
                  {source}
                </label>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-text-secondary hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-blue-700 rounded-lg"
            >
              Save Sources
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSourcesModal;
