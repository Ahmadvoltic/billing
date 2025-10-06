export const EmailTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'tab1', label: 'Email Accounts' },
    { id: 'tab2', label: 'Connected Accounts' },
  ];

  return (
    <div className="flex gap-4 border-b border-border-color mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-3 text-sm font-medium transition-colors relative ${
            activeTab === tab.id
              ? 'text-primary border-b-2 border-primary -mb-[1px]'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
