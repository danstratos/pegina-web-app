import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET || 'secret_dev', { expiresIn: '7d' });

export const register = async (req, res) => {
  const { nombre, apellido, correo, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Las contraseñas no coinciden' });
  }

  const exists = await User.findOne({ correo });
  if (exists) {
    return res.status(409).json({ message: 'Correo ya registrado' });
  }

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ nombre, apellido, correo, password: hash, role: 'user' });
  const token = signToken(user._id);

  res.status(201).json({
    token,
    user: {
      id: user._id,
      nombre: user.nombre,
      apellido: user.apellido,
      correo: user.correo,
      role: user.role,
      direccion: user.direccion,
      telefono: user.telefono
    }
  });
};

export const login = async (req, res) => {
  const { correo, password } = req.body;
  const user = await User.findOne({ correo });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  const token = signToken(user._id);
  res.json({
    token,
    user: {
      id: user._id,
      nombre: user.nombre,
      apellido: user.apellido,
      correo: user.correo,
      role: user.role,
      direccion: user.direccion,
      telefono: user.telefono
    }
  });
};

export const me = async (req, res) => {
  res.json(req.user);
};
