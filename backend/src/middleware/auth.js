import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No autorizado' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret_dev');
    const user = await User.findById(payload.id).select('-password');

    if (!user) {
      return res.status(401).json({ message: 'Usuario inválido' });
    }

    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Solo administrador' });
  }
  next();
};
