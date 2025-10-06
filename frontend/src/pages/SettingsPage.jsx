import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import ProfileTab from '../components/Settings/ProfileTab';
import UserManagementTab from '../components/Settings/UserManagementTab';
import ApiKeysTab from '../components/Settings/ApiKeysTab';
import { useGetCurrentUser } from '../lib/queries';

export const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();
  const { data: currentUserData } = useGetCurrentUser();
  const currentUser = currentUserData?.user;

  const handleTabChange = (tab) => {
    if (tab === 'settings') {
      navigate('/settings');
    } else if (tab === 'email-accounts') {
      navigate('/dashboard');
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', roles: ['super_admin', 'admin', 'user', 'viewer'] },
    { id: 'users', label: 'User Management', roles: ['super_admin', 'admin'] },
    { id: 'api-keys', label: 'API Keys', roles: ['super_admin'] },
  ];

  const visibleTabs = tabs.filter(tab => tab.roles.includes(currentUser?.role));

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeTab="settings" onTabChange={handleTabChange} />
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-text-primary mb-6">Settings</h1>

          {/* Tabs */}
          <div className="border-b border-border-color mb-6">
            <nav className="-mb-px flex space-x-8">
              {visibleTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    py-2 px-1 border-b-2 font-medium text-sm transition-colors
                    ${
                      activeTab === tab.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-text-secondary hover:text-text-primary hover:border-gray-300'
                    }
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === 'profile' && <ProfileTab currentUser={currentUser} />}
            {activeTab === 'users' && <UserManagementTab currentUser={currentUser} />}
            {activeTab === 'api-keys' && <ApiKeysTab />}
          </div>
        </div>
      </div>
    </div>
  );
};
