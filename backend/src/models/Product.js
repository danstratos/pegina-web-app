import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true, min: 0 },
    cantidad: { type: Number, required: true, min: 0 },
    imagen: { type: String, default: '' },
    categoria: { type: String, required: true, trim: true },
    ingredientes: [{ type: String }]
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
