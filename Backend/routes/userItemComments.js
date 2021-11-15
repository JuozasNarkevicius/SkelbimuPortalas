import express from 'express';

import { getComments, createComment, getComment, updateComment, deleteComment } from '../controllers/userItemComments.js';
import { verifyToken } from '../controllers/authentication.js';
import { check } from 'express-validator';

const router = express.Router({ mergeParams: true });

router.get('/', getComments);
router.post('/', [
    check('text').exists({checkFalsy: true}).withMessage("Cannot be empty").isLength({min: 3}).withMessage("Minimum lenght is 3 symbols"),
], verifyToken, createComment);
router.get('/:commentId', getComment)
router.patch('/:commentId', verifyToken, updateComment);
router.delete('/:commentId', verifyToken, deleteComment);

export default router;