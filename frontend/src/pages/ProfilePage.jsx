import { useState } from 'react';
import { request } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({
    nombre: user?.nombre || '',
    apellido: user?.apellido || '',
    correo: user?.correo || '',
    direccion: user?.direccion || '',
    telefono: user?.telefono || ''
  });

  const submit = async (e) => {
    e.preventDefault();
    const updated = await request('/users/me/profile', { method: 'PUT', body: JSON.stringify(form) });
    setUser(updated);
    localStorage.setItem('user', JSON.stringify(updated));
    alert('Perfil actualizado');
  };

  return (
    <form className="card" onSubmit={submit}>
      <h2>Mi Perfil</h2>
      {Object.keys(form).map((k) => (
        <input key={k} value={form[k]} onChange={(e) => setForm((prev) => ({ ...prev, [k]: e.target.value }))} placeholder={k} />
      ))}
      <button type="submit">Guardar cambios</button>
    </form>
  );
}
