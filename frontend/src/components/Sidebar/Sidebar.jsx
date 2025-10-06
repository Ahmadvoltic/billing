import { Inbox, Users, Cog, FileText, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../../lib/mutations';
import toast from 'react-hot-toast';

const Sidebar = ({ activeTab, onTabChange }) => {
  const navigate = useNavigate();
  const logoutMutation = useLogout();

  const menuItems = [
    { id: 'email-accounts', label: 'Email Accounts', icon: Inbox },
    // { id: 'connected-accounts', label: 'Connected Accounts', icon: Users },
    // { id: 'invoices', label: 'Invoices', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Cog },
  ];

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  return (
    <div className="w-64 bg-bg-sidebar h-screen border-r border-border-color p-4 flex flex-col">
      {/* Logo/Brand */}
      <div className="mb-8 px-3">
        <h1 className="text-xl font-bold text-text-primary">Dummy</h1>
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-1 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-text-secondary hover:bg-gray-100 hover:text-text-primary'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="mt-auto pt-4 border-t border-border-color">
        <button
          onClick={handleLogout}
          disabled={logoutMutation.isPending}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <LogOut className="w-5 h-5" />
          <span>{logoutMutation.isPending ? 'Logging out...' : 'Logout'}</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
