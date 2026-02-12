import { Router } from 'express';
import {
  getFavorites,
  getUsers,
  toggleFavorite,
  updateMyProfile,
  updateUserByAdmin
} from '../controllers/userController.js';
import { adminOnly, protect } from '../middleware/auth.js';

const router = Router();

router.get('/me/favorites', protect, getFavorites);
router.post('/me/favorites/:productId', protect, toggleFavorite);
router.put('/me/profile', protect, updateMyProfile);
router.get('/', protect, adminOnly, getUsers);
router.put('/:id', protect, adminOnly, updateUserByAdmin);

export default router;
