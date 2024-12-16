import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../lib/contexts/AuthContext';

const UnauthorizedRoute: React.FC = () => {
  return <Outlet />;
};

export default UnauthorizedRoute;
