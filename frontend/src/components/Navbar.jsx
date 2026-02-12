import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <h1>NEXO GAMES</h1>
      <div className="nav-links">
        <Link to="/">Inicio</Link>
        {user && <Link to="/favoritos">Favoritos</Link>}
        {user && <Link to="/perfil">Perfil</Link>}
        {user?.role === 'admin' && <Link to="/admin/usuarios">Usuarios</Link>}
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Registro</Link>
          </>
        ) : (
          <button onClick={logout}>Logout</button>
        )}
      </div>
    </nav>
  );
}
