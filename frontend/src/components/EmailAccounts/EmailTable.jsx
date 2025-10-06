import { EmailRow } from './EmailRow';
import { ChevronIcon } from '../../assets';

export const EmailTable = ({ data, onSortByStatus, customFields, onEditCustomFields, onEditSources, onEditPhone, onDeleteCustomField, isViewer, canManageFields }) => {
  return (
    <div>
      {/* Table Header */}
      <div className="flex items-center gap-4 px-4 py-3 mb-2">
        {/* Checkbox placeholder */}
        <div className="w-5 flex-shrink-0"></div>

        {/* User Name - 180px */}
        <div className="w-[180px] flex-shrink-0 text-xs font-medium text-text-secondary uppercase tracking-wider">
          Name
        </div>

        {/* Email - flex 1 */}
        <div className="flex-1 text-xs font-medium text-text-secondary uppercase tracking-wider">
          Email
        </div>

        {/* Source - 200px */}
        <div className="w-[200px] flex-shrink-0 text-xs font-medium text-text-secondary uppercase tracking-wider">
          Source
        </div>

        {/* Phone Number - 140px */}
        <div className="w-[140px] flex-shrink-0 text-xs font-medium text-text-secondary uppercase tracking-wider">
          Phone
        </div>

        {/* Due Date - 120px */}
        <div className="w-[120px] flex-shrink-0 text-xs font-medium text-text-secondary uppercase tracking-wider">
          Due Date
        </div>

        {/* Status - 100px */}
        <button
          onClick={onSortByStatus}
          className="w-[100px] flex-shrink-0 text-xs font-medium text-text-secondary uppercase tracking-wider flex items-center gap-1 hover:text-text-primary"
        >
          Status
          <ChevronIcon direction="up" className="w-4 h-4" />
        </button>

        {/* Custom Field Headers - Dynamic */}
        {customFields.map((field) => (
          <div key={field._id} className="w-[140px] flex-shrink-0 text-xs font-medium text-text-secondary uppercase tracking-wider flex items-center justify-between group">
            <span>{field.name}</span>
            {canManageFields && onDeleteCustomField && (
              <button
                onClick={() => onDeleteCustomField(field._id, field.name)}
                className="opacity-0 group-hover:opacity-100 ml-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded px-1.5 py-0.5 transition-all text-lg font-bold"
                aria-label={`Delete ${field.name} field`}
              >
                ×
              </button>
            )}
          </div>
        ))}

        {/* Actions - 60px */}
        <div className="w-[60px] flex-shrink-0"></div>
      </div>

      {/* Table Rows */}
      <div>
        {data.length === 0 ? (
          <div className="text-center py-8 text-text-secondary">
            No records found
          </div>
        ) : (
          data.map((item) => (
            <EmailRow
              key={item._id}
              item={item}
              customFields={customFields}
              onEditCustomFields={onEditCustomFields}
              onEditSources={onEditSources}
              onEditPhone={onEditPhone}
              isViewer={isViewer}
            />
          ))
        )}
      </div>
    </div>
  );
};
