import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useUpdateEmailAccount } from '../../lib/mutations';

const EditCustomValueModal = ({ isOpen, onClose, customFields, currentValues, itemId }) => {
  const [values, setValues] = useState({});

  const updateEmailAccountMutation = useUpdateEmailAccount();

  useEffect(() => {
    if (currentValues) {
      setValues(currentValues);
    }
  }, [currentValues]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEmailAccountMutation.mutateAsync({
        id: itemId,
        data: { customFields: values }
      });
      toast.success('Custom field values updated successfully!');
      onClose();
    } catch (error) {
      console.error('Failed to update custom values:', error);
      toast.error('Failed to update custom field values');
    }
  };

  const handleChange = (fieldName, value) => {
    setValues(prev => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-text-primary">Edit Custom Fields</h2>
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
            {customFields.length === 0 ? (
              <p className="text-sm text-text-secondary text-center py-4">
                No custom fields added yet. Add custom fields first.
              </p>
            ) : (
              customFields.map((field) => (
                <div key={field._id}>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    {field.name}
                  </label>
                  <input
                    type={field.fieldType}
                    value={values[field.name] || ''}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    placeholder={`Enter ${field.name.toLowerCase()}`}
                    className="w-full px-3 py-2 border border-border-color rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              ))
            )}
          </div>

          {/* Actions */}
          {customFields.length > 0 && (
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
                Save
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditCustomValueModal;
