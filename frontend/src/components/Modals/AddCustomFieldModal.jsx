import { useState } from 'react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCreateCustomField } from '../../lib/mutations';

const AddCustomFieldModal = ({ isOpen, onClose }) => {
  const [fieldName, setFieldName] = useState('');
  const [fieldType, setFieldType] = useState('text');

  const createCustomFieldMutation = useCreateCustomField();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedName = fieldName.trim();

    // Validate field name - no dots or special characters that MongoDB Map doesn't support
    if (trimmedName.includes('.') || trimmedName.includes('$')) {
      toast.error('Field name cannot contain dots (.) or dollar signs ($)');
      return;
    }

    if (trimmedName) {
      try {
        await createCustomFieldMutation.mutateAsync({
          name: trimmedName,
          fieldType: fieldType,
        });
        toast.success('Custom field added successfully!');
        setFieldName('');
        setFieldType('text');
        onClose();
      } catch (error) {
        console.error('Failed to create custom field:', error);
        toast.error(error.message || 'Failed to create custom field');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-text-primary">Add Custom Field</h2>
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
          <div className="space-y-4">
            {/* Field Name */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Field Name
              </label>
              <input
                type="text"
                value={fieldName}
                onChange={(e) => setFieldName(e.target.value)}
                placeholder="Enter field name (no dots or special characters)"
                className="w-full px-3 py-2 border border-border-color rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
              <p className="text-xs text-text-secondary mt-1">
                Field names cannot contain dots (.) or dollar signs ($)
              </p>
            </div>

            {/* Field Type */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Field Type
              </label>
              <select
                value={fieldType}
                onChange={(e) => setFieldType(e.target.value)}
                className="w-full px-3 py-2 border border-border-color rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="date">Date</option>
              </select>
            </div>
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
              Add Field
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomFieldModal;
