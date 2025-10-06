import { useState, useRef, useEffect } from 'react';
import { CheckboxIcon, KebabIcon } from '../../assets';
import { MoreVertical } from 'lucide-react';

export const EmailRow = ({ item, customFields, onEditCustomFields, onEditSources, onEditPhone, isViewer }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  const getStatusBadge = (status) => {
    if (status === 'paid') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Paid
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          Unpaid
        </span>
      );
    }
  };

  const getSourceBadge = (source) => {
    const colors = {
      Slack: 'bg-purple-100 text-purple-700',
      WhatsApp: 'bg-green-100 text-green-700',
      Email: 'bg-blue-100 text-blue-700',
    };

    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${colors[source] || 'bg-gray-100 text-gray-700'}`}>
        {source}
      </span>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const handleEditCustomFields = () => {
    setShowMenu(false);
    onEditCustomFields(item);
  };

  const handleEditSources = () => {
    setShowMenu(false);
    onEditSources(item);
  };

  const handleEditPhone = () => {
    setShowMenu(false);
    onEditPhone(item);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border-color p-4 mb-4">
      <div className="flex items-center gap-4">
        {/* Checkbox */}
        <button
          onClick={() => setIsChecked(!isChecked)}
          className="flex-shrink-0"
          aria-label={`Select ${item.userName}`}
        >
          <CheckboxIcon checked={isChecked} className="w-5 h-5 text-gray-600" />
        </button>

        {/* User Name - 180px */}
        <div className="w-[180px] flex-shrink-0">
          <div className="text-sm font-semibold text-text-primary truncate">
            {item.userName}
          </div>
        </div>

        {/* Email - flex 1 */}
        <div className="flex-1 min-w-0">
          <div className="text-sm text-text-secondary truncate">
            {item.email}
          </div>
        </div>

        {/* Source Badges - 200px */}
        <div className="w-[200px] flex-shrink-0">
          <div className="flex flex-wrap gap-1">
            {item.sources.map((source, index) => (
              <div key={index}>
                {getSourceBadge(source)}
              </div>
            ))}
          </div>
        </div>

        {/* Phone Number - 140px */}
        <div className="w-[140px] flex-shrink-0">
          <div className="text-sm text-text-secondary">
            {item.phoneNumber}
          </div>
        </div>

        {/* Due Date - 120px */}
        <div className="w-[120px] flex-shrink-0">
          <div className="text-sm text-text-secondary">
            {formatDate(item.dueDate)}
          </div>
        </div>

        {/* Status - 100px */}
        <div className="w-[100px] flex-shrink-0">
          {getStatusBadge(item.status)}
        </div>

        {/* Custom Fields - Dynamic */}
        {customFields.map((field) => (
          <div key={field.name} className="w-[140px] flex-shrink-0">
            <div className="text-sm text-text-secondary truncate">
              {item.customFields?.[field.name] || '-'}
            </div>
          </div>
        ))}

        {/* Actions - 60px */}
        <div className="w-[60px] flex-shrink-0 flex items-center justify-end relative" ref={menuRef}>
          {!isViewer && (
            <>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1 hover:bg-gray-100 rounded"
                aria-label="Open actions menu"
              >
                <KebabIcon className="w-5 h-5 text-text-secondary" />
              </button>

              {/* Dropdown Menu */}
              {showMenu && (
                <div className="absolute right-0 top-8 bg-white border border-border-color rounded-lg shadow-lg py-1 z-10 min-w-[180px]">
                  <button
                    onClick={handleEditCustomFields}
                    className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-gray-50"
                  >
                    Edit Custom Fields
                  </button>
              <button
                onClick={handleEditSources}
                className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-gray-50"
              >
                Edit Sources
              </button>
                  <button
                    onClick={handleEditPhone}
                    className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-gray-50"
                  >
                    Edit Phone Number
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
