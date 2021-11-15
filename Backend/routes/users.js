import express from 'express';
import { createUser, getUsers, getUser, deleteUser, updateUser } from '../controllers/users.js';
import { verifyToken } from '../controllers/authentication.js';

const router = express.Router({ mergeParams: true });
router.get('/', verifyToken, getUsers);
router.post('/', createUser);
router.get('/:userId', getUser);
router.delete('/:userId', verifyToken, deleteUser);
router.patch('/:userId', verifyToken, updateUser);

export default router;