import express from 'express';

import { getComments, createComment, getComment, updateComment, deleteComment } from '../controllers/userItemComments.js';

const router = express.Router({ mergeParams: true });

router.get('/', getComments);
router.post('/', createComment);
router.get('/:commentId', getComment)
router.patch('/:commentId', updateComment);
router.delete('/:commentId', deleteComment);

export default router;