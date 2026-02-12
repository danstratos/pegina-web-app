import { useEffect, useState } from 'react';
import { request } from '../api/client';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    request('/users/me/favorites').then(setFavorites);
  }, []);

  return (
    <section className="card">
      <h2>Mis Favoritos</h2>
      {favorites.length === 0 ? (
        <p>No tienes productos favoritos todavía. ¡Agrega algunos desde el inicio!</p>
      ) : (
        <ul>
          {favorites.map((f) => (
            <li key={f._id}>{f.nombre} - ${f.precio}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
