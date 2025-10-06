import { useState, useRef, useEffect } from 'react';
import { ChevronIcon } from '../../assets';
import { Calendar } from 'lucide-react';

const DateRangeFilter = ({ startDate, endDate, onDateChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempStartDate, setTempStartDate] = useState(startDate || '');
  const [tempEndDate, setTempEndDate] = useState(endDate || '');
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

  const handleApply = () => {
    onDateChange(tempStartDate, tempEndDate);
    setIsOpen(false);
  };

  const handleClear = () => {
    setTempStartDate('');
    setTempEndDate('');
    onDateChange('', '');
    setIsOpen(false);
  };

  const getDisplayText = () => {
    if (!startDate && !endDate) return 'Due Date';
    if (startDate && endDate) return `${startDate} - ${endDate}`;
    if (startDate) return `From ${startDate}`;
    if (endDate) return `Until ${endDate}`;
    return 'Due Date';
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 border border-border-color rounded-lg text-sm text-text-secondary hover:bg-gray-50"
      >
        <Calendar className="w-4 h-4" />
        <span>{getDisplayText()}</span>
        <ChevronIcon direction={isOpen ? "up" : "down"} className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-1 right-0 bg-white border border-border-color rounded-lg shadow-lg p-4 z-20 min-w-[280px]">
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-text-primary mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={tempStartDate}
                onChange={(e) => setTempStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-border-color rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-text-primary mb-1">
                End Date
              </label>
              <input
                type="date"
                value={tempEndDate}
                onChange={(e) => setTempEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-border-color rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={handleClear}
                className="flex-1 px-3 py-2 text-sm font-medium text-text-secondary hover:bg-gray-100 rounded-lg"
              >
                Clear
              </button>
              <button
                onClick={handleApply}
                className="flex-1 px-3 py-2 text-sm font-medium text-white bg-primary hover:bg-blue-700 rounded-lg"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangeFilter;
