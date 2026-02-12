import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

dotenv.config();

const categorias = ['Consolas', 'Accesorios', 'Videojuegos', 'Merchandising'];

const products = Array.from({ length: 24 }).map((_, i) => ({
  nombre: `Producto NEXO ${i + 1}`,
  descripcion: `Descripción detallada del producto ${i + 1} para gamers de NEXO GAMES.`,
  precio: 15 + i * 3,
  cantidad: i % 7 === 0 ? 0 : 5 + i,
  imagen: `https://picsum.photos/seed/nexo-${i + 1}/400/300`,
  categoria: categorias[i % categorias.length],
  ingredientes: ['edición especial', 'garantía oficial']
}));

const run = async () => {
  await connectDB();
  await Product.deleteMany();
  await User.deleteMany();
  await Product.insertMany(products);

  const adminPassword = await bcrypt.hash('Admin123*', 10);
  await User.create({
    nombre: 'Admin',
    apellido: 'Nexo',
    correo: 'admin@nexogames.com',
    password: adminPassword,
    role: 'admin',
    direccion: 'Tienda central',
    telefono: '000-000-000'
  });

  console.log('Seed completado');
  process.exit(0);
};

run();
