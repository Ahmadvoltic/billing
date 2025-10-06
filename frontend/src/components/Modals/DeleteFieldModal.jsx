import { X } from 'lucide-react';

const DeleteFieldModal = ({ isOpen, onClose, onConfirm, fieldName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-text-primary">Delete Custom Field</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        {/* Content */}
        <div className="mb-6">
          <p className="text-sm text-text-secondary mb-3">
            Are you sure you want to delete the custom field <span className="font-semibold text-text-primary">"{fieldName}"</span>?
          </p>
          <p className="text-sm text-red-600">
            This will remove this field from all records permanently. This action cannot be undone.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-text-secondary hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg"
          >
            Delete Field
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteFieldModal;
