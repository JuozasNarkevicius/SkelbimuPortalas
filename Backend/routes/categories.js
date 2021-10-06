import express from 'express';

import { getCategories, createCategory, getCategory, updateCategory, deleteCategory } from '../controllers/categories.js';

const router = express.Router({ mergeParams: true });

router.get('/', getCategories);
router.post('/', createCategory);
router.get('/:categoryId', getCategory)
router.patch('/:categoryId', updateCategory);
router.delete('/:categoryId', deleteCategory);

export default router;