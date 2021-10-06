import express from 'express';

import { getItems, createItem, getItem, updateItem, deleteItem } from '../controllers/userItems.js';

const router = express.Router({ mergeParams: true });


router.get('/', getItems);
router.post('/', createItem);
router.get('/:itemId', getItem);
router.patch('/:itemId', updateItem);
router.delete('/:itemId', deleteItem);

export default router;