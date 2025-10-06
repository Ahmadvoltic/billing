/**
 * Filter billing records by search query (email, userName, or phoneNumber)
 */
export const filterEmailAccounts = (accounts, query) => {
  if (!query.trim()) return accounts;

  const lowerQuery = query.toLowerCase();
  return accounts.filter(account =>
    account.email.toLowerCase().includes(lowerQuery) ||
    account.userName.toLowerCase().includes(lowerQuery) ||
    account.phoneNumber.toLowerCase().includes(lowerQuery)
  );
};

/**
 * Filter by status
 */
export const filterByStatus = (accounts, selectedStatuses) => {
  if (!selectedStatuses || selectedStatuses.length === 0) return accounts;
  return accounts.filter(account => selectedStatuses.includes(account.status));
};

/**
 * Filter by sources
 */
export const filterBySources = (accounts, selectedSources) => {
  if (!selectedSources || selectedSources.length === 0) return accounts;
  return accounts.filter(account =>
    account.sources.some(source => selectedSources.includes(source))
  );
};

/**
 * Filter by date range
 */
export const filterByDateRange = (accounts, startDate, endDate) => {
  if (!startDate && !endDate) return accounts;

  return accounts.filter(account => {
    const dueDate = new Date(account.dueDate);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start && end) {
      return dueDate >= start && dueDate <= end;
    } else if (start) {
      return dueDate >= start;
    } else if (end) {
      return dueDate <= end;
    }
    return true;
  });
};

/**
 * Get unique statuses from data
 */
export const getUniqueStatuses = (accounts) => {
  const statuses = accounts.map(account => account.status);
  return [...new Set(statuses)];
};

/**
 * Get unique sources from data
 */
export const getUniqueSources = (accounts) => {
  const allSources = accounts.flatMap(account => account.sources);
  return [...new Set(allSources)];
};

/**
 * Sort billing records by status (paid/unpaid)
 */
export const sortByStatus = (accounts, paidFirst = true) => {
  return [...accounts].sort((a, b) => {
    if (paidFirst) {
      return a.status === 'paid' ? -1 : 1;
    } else {
      return a.status === 'unpaid' ? -1 : 1;
    }
  });
};

/**
 * Sort billing records by due date
 */
export const sortByDueDate = (accounts, ascending = true) => {
  return [...accounts].sort((a, b) => {
    const dateA = new Date(a.dueDate);
    const dateB = new Date(b.dueDate);
    return ascending ? dateA - dateB : dateB - dateA;
  });
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text, maxLength = 20) => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}…`;
};

/**
 * Format date for display
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

/**
 * Get status badge color class
 */
export const getStatusColorClass = (status) => {
  return status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
};
