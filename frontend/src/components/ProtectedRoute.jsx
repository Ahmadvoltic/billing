import { Navigate } from 'react-router-dom';
import { useGetCurrentUser } from '../lib/queries';

const ProtectedRoute = ({ children }) => {
  const { data: user, isLoading, error } = useGetCurrentUser();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-text-secondary">Loading...</div>
      </div>
    );
  }

  if (error || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
