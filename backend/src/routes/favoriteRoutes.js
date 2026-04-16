import express from 'express';
import {
  addFavorite,
  removeFavorite,
  getUserFavorites,
  checkFavorite
} from '../controllers/favoriteController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.post('/', addFavorite);
router.get('/', getUserFavorites);
router.get('/check/:destination_id', checkFavorite);
router.delete('/:destination_id', removeFavorite);

export default router;