import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    apellido: { type: String, required: true, trim: true },
    correo: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    direccion: { type: String, default: '' },
    telefono: { type: String, default: '' },
    favoritos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
