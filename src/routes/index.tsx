import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import UnauthorizedRoute from './UnauthorizedRoute';
import PrivateRoute from './PrivateRoute';
import Welcome from '../pages/Welcome';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import ForgotPassword from '../pages/ForgotPassword';
import Onboarding from '../pages/Onboarding';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Unauthorized Routes */}
        <Route element={<UnauthorizedRoute />}>
          <Route path='/' element={<Welcome />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Route>

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path='/onboarding' element={<Onboarding />} />
          <Route path='/profile' element={<Profile />} />
        </Route>

        {/* Redirect to home page */}
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
