import bcrypt from 'bcryptjs';
import User from '../models/User.js';

export const getUsers = async (_req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.json(users);
};

export const updateUserByAdmin = async (req, res) => {
  const updates = { ...req.body };
  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, 10);
  }

  const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
  res.json(user);
};

export const updateMyProfile = async (req, res) => {
  const allowed = ['nombre', 'apellido', 'correo', 'direccion', 'telefono'];
  const updates = Object.fromEntries(Object.entries(req.body).filter(([k]) => allowed.includes(k)));
  const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select('-password');
  res.json(user);
};

export const toggleFavorite = async (req, res) => {
  const user = await User.findById(req.user._id);
  const productId = req.params.productId;
  const exists = user.favoritos.some((id) => id.toString() === productId);

  if (exists) {
    user.favoritos = user.favoritos.filter((id) => id.toString() !== productId);
  } else {
    user.favoritos.push(productId);
  }

  await user.save();
  await user.populate('favoritos');
  res.json(user.favoritos);
};

export const getFavorites = async (req, res) => {
  const user = await User.findById(req.user._id).populate('favoritos');
  res.json(user.favoritos);
};
