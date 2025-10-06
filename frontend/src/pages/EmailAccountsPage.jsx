import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import MainContent from '../components/MainContent/MainContent';

export const EmailAccountsPage = () => {
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    if (tab === 'settings') {
      navigate('/settings');
    } else if (tab === 'email-accounts') {
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar activeTab="email-accounts" onTabChange={handleTabChange} />

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <MainContent activeTab="email-accounts" />
      </div>
    </div>
  );
};
