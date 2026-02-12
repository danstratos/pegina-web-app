import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useAuth } from './context/AuthContext';
import AdminUsersPage from './pages/AdminUsersPage';
import FavoritesPage from './pages/FavoritesPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';

function Protected({ children, admin }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (admin && user.role !== 'admin') return <Navigate to="/" />;
  return children;
}

export default function App() {
  return (
    <div className="container">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/favoritos" element={<Protected><FavoritesPage /></Protected>} />
        <Route path="/perfil" element={<Protected><ProfilePage /></Protected>} />
        <Route path="/admin/usuarios" element={<Protected admin><AdminUsersPage /></Protected>} />
      </Routes>
    </div>
  );
}
