import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ nombre: '', apellido: '', correo: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(form);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="card" onSubmit={submit}>
      <h2>Registro</h2>
      {Object.keys(form).map((key) => (
        <input
          key={key}
          placeholder={key}
          type={key.includes('password') ? 'password' : 'text'}
          value={form[key]}
          onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
          required
        />
      ))}
      {error && <p className="error">{error}</p>}
      <button type="submit">Crear cuenta</button>
    </form>
  );
}
