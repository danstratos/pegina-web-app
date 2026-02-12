import { useState } from 'react';

const initial = {
  nombre: '',
  descripcion: '',
  precio: 0,
  cantidad: 0,
  imagen: '',
  categoria: '',
  ingredientes: ''
};

export default function ProductForm({ onSubmit, initialData, onCancel }) {
  const [form, setForm] = useState(
    initialData
      ? { ...initialData, ingredientes: initialData.ingredientes?.join(', ') || '' }
      : initial
  );

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      precio: Number(form.precio),
      cantidad: Number(form.cantidad),
      ingredientes: form.ingredientes
        .split(',')
        .map((x) => x.trim())
        .filter(Boolean)
    });
  };

  return (
    <form className="card" onSubmit={submit}>
      <h3>{initialData ? 'Editar producto' : 'Crear producto'}</h3>
      {['nombre', 'descripcion', 'imagen', 'categoria', 'ingredientes'].map((key) => (
        <input key={key} name={key} value={form[key]} onChange={handleChange} placeholder={key} required={key !== 'ingredientes'} />
      ))}
      <input name="precio" type="number" value={form.precio} onChange={handleChange} placeholder="precio" required />
      <input name="cantidad" type="number" value={form.cantidad} onChange={handleChange} placeholder="cantidad" required />
      <div className="row">
        <button type="submit">Guardar</button>
        {onCancel && <button type="button" onClick={onCancel}>Cancelar</button>}
      </div>
    </form>
  );
}
