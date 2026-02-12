import { useEffect, useState } from 'react';
import { request } from '../api/client';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(null);

  const load = async () => setUsers(await request('/users'));
  useEffect(() => {
    load();
  }, []);

  const save = async (e) => {
    e.preventDefault();
    await request(`/users/${editing._id}`, { method: 'PUT', body: JSON.stringify(editing) });
    setEditing(null);
    load();
  };

  return (
    <div className="card">
      <h2>Administración de usuarios</h2>
      <ul>
        {users.map((u) => (
          <li key={u._id}>
            {u.nombre} {u.apellido} - {u.correo} ({u.role})
            <button onClick={() => setEditing(u)}>Editar</button>
          </li>
        ))}
      </ul>

      {editing && (
        <form onSubmit={save}>
          {['nombre', 'apellido', 'correo', 'direccion', 'telefono', 'role'].map((k) => (
            <input
              key={k}
              value={editing[k] || ''}
              placeholder={k}
              onChange={(e) => setEditing((prev) => ({ ...prev, [k]: e.target.value }))}
            />
          ))}
          <button type="submit">Guardar usuario</button>
        </form>
      )}
    </div>
  );
}
