import express from 'express';

import { getItems, createItem, getItem, updateItem, deleteItem } from '../controllers/userItems.js';
import { verifyToken } from '../controllers/authentication.js';
import { check } from 'express-validator';

const router = express.Router({ mergeParams: true });


router.get('/', verifyToken, getItems);
router.post('/', [
    check('title').exists({checkFalsy: true}).withMessage("Cannot be empty").isLength({min: 3}).withMessage("Minimum lenght is 3 symbols"),
    check('price').exists({checkFalsy: true}).withMessage("Cannot be empty").isInt({min: 1}).withMessage("Price has to be a number higher than 0"),
    check('description').exists({checkFalsy: true}).withMessage("Cannot be empty").isLength({min: 3}).withMessage("Minimum lenght is 3 symbols"),
    check('image').exists({checkFalsy: true}).withMessage("Cannot be empty"),
    ], verifyToken, createItem);
router.get('/:itemId', getItem);
router.patch('/:itemId', verifyToken, updateItem);
router.delete('/:itemId', verifyToken, deleteItem);

export default router;