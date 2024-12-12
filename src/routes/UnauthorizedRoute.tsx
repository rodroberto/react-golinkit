import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../lib/contexts/AuthContext';

const UnauthorizedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to='/' />;
  }

  return <Outlet />;
};

export default UnauthorizedRoute;
