import { useEffect, useState } from 'react';
import { request } from '../api/client';
import ProductForm from '../components/ProductForm';
import { useAuth } from '../context/AuthContext';

export default function HomePage() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [q, setQ] = useState('');
  const [categoria, setCategoria] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    const includeEmpty = user?.role === 'admin';
    const data = await request(
      `/products?q=${encodeURIComponent(q)}&categoria=${encodeURIComponent(categoria)}&page=${page}&limit=8&includeEmpty=${includeEmpty}`
    );
    setProducts(data.items);
    setPages(data.pages || 1);
  };

  useEffect(() => {
    load();
  }, [q, categoria, page, user]);

  useEffect(() => {
    request('/products/categories').then(setCategories);
  }, []);

  const saveProduct = async (payload) => {
    if (editing?._id) {
      await request(`/products/${editing._id}`, { method: 'PUT', body: JSON.stringify(payload) });
      setEditing(null);
    } else {
      await request('/products', { method: 'POST', body: JSON.stringify(payload) });
    }
    load();
  };

  const removeProduct = async (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar este producto?')) return;
    await request(`/products/${id}`, { method: 'DELETE' });
    load();
  };

  const toggleFav = async (id) => {
    await request(`/users/me/favorites/${id}`, { method: 'POST' });
    alert('Favoritos actualizados');
  };

  return (
    <div>
      <div className="card">
        <h2>Inventario de productos</h2>
        <input placeholder="Buscar por nombre, descripción o categoría" value={q} onChange={(e) => { setPage(1); setQ(e.target.value); }} />
        <select value={categoria} onChange={(e) => { setPage(1); setCategoria(e.target.value); }}>
          <option value="">Todas las categorías</option>
          {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>

      {user?.role === 'admin' && (
        <ProductForm onSubmit={saveProduct} initialData={editing} onCancel={() => setEditing(null)} />
      )}

      <section className="grid">
        {products.map((p) => (
          <article className="card" key={p._id}>
            <img src={p.imagen} alt={p.nombre} />
            <h3>{p.nombre}</h3>
            <p>{p.descripcion}</p>
            <p><b>Precio:</b> ${p.precio}</p>
            <p><b>Existencia:</b> {p.cantidad}</p>
            <p><b>Categoría:</b> {p.categoria}</p>
            <div className="row">
              {user && <button onClick={() => toggleFav(p._id)}>Favorito</button>}
              {user?.role === 'admin' && (
                <>
                  <button onClick={() => setEditing(p)}>Editar</button>
                  <button onClick={() => removeProduct(p._id)}>Eliminar</button>
                </>
              )}
            </div>
          </article>
        ))}
      </section>

      <div className="pagination">
        <button disabled={page <= 1} onClick={() => setPage((prev) => prev - 1)}>Anterior</button>
        <span>Página {page} de {pages}</span>
        <button disabled={page >= pages} onClick={() => setPage((prev) => prev + 1)}>Siguiente</button>
      </div>

      <section className="card">
        <h3>Listado rápido</h3>
        <ul>
          {products.map((p) => (
            <li key={p._id}>{p.nombre} - Stock: {p.cantidad} - {p.descripcion.slice(0, 60)}...</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
