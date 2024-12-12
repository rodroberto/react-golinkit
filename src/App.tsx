import MainLayout from './components/layouts/MainLayout';
import { AuthProvider } from './lib/contexts/AuthContext';
import AppRoutes from './routes';

function App() {
  return (
    <AuthProvider>
      <MainLayout>
        <AppRoutes />
      </MainLayout>
    </AuthProvider>
  );
}

export default App;
