import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(correo, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="card" onSubmit={submit}>
      <h2>Login</h2>
      <input placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
      <input placeholder="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      {error && <p className="error">{error}</p>}
      <button type="submit">Ingresar</button>
    </form>
  );
}
