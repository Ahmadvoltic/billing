import { useState, useRef, useEffect } from 'react';
import { ChevronIcon } from '../../assets';
import { X } from 'lucide-react';

const FilterDropdown = ({ label, options, selectedValues, onSelectionChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = (value) => {
    const newSelection = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value];
    onSelectionChange(newSelection);
  };

  const handleClearAll = () => {
    onSelectionChange([]);
  };

  const getDisplayText = () => {
    if (selectedValues.length === 0) return label;
    if (selectedValues.length === 1) return selectedValues[0];
    return `${selectedValues.length} selected`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 border border-border-color rounded-lg text-sm text-text-secondary hover:bg-gray-50"
      >
        <span>{getDisplayText()}</span>
        <ChevronIcon direction={isOpen ? "up" : "down"} className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-1 left-0 bg-white border border-border-color rounded-lg shadow-lg py-2 z-20 min-w-[200px]">
          {/* Header with Clear All */}
          {selectedValues.length > 0 && (
            <div className="px-3 pb-2 mb-2 border-b border-border-color flex items-center justify-between">
              <span className="text-xs text-text-secondary">
                {selectedValues.length} selected
              </span>
              <button
                onClick={handleClearAll}
                className="text-xs text-primary hover:text-blue-700 flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                Clear
              </button>
            </div>
          )}

          {/* Options */}
          <div className="max-h-60 overflow-y-auto">
            {options.map((option) => (
              <div
                key={option}
                className="px-3 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2"
                onClick={() => handleToggle(option)}
              >
                <input
                  type="checkbox"
                  checked={selectedValues.includes(option)}
                  onChange={() => {}}
                  className="w-4 h-4 text-primary border-border-color rounded focus:ring-2 focus:ring-primary"
                />
                <span className="text-sm text-text-primary">{option}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
