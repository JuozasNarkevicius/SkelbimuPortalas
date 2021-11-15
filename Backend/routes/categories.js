import express from 'express';

import { getCategories, createCategory, getCategory, updateCategory, deleteCategory } from '../controllers/categories.js';
import { verifyToken } from '../controllers/authentication.js';
import { check } from 'express-validator';

const router = express.Router({ mergeParams: true });

router.get('/', getCategories);
router.post('/', [
    check('title').exists({checkFalsy: true}).withMessage("Cannot be empty").isLength({min: 3}).withMessage("Minimum lenght is 3 symbols"),
], verifyToken, createCategory);
router.get('/:categoryId', getCategory)
router.patch('/:categoryId', verifyToken, updateCategory);
router.delete('/:categoryId', verifyToken, deleteCategory);

export default router;