import express from 'express';
import mongoose from 'mongoose';

import usersRoutes from './routes/users.js';
import itemRoutes from './routes/items.js';
import commentRoutes from './routes/comments.js';
import categoryRoutes from './routes/categories.js';
import { register, login, verifyToken, newToken, logout } from './controllers/authentication.js';
import { check } from 'express-validator';

import userItemRoutes from './routes/userItems.js';
import userItemCommentRoutes from './routes/userItemComments.js';
``
const app = express();
const PORT = process.env.PORT || 5000;
const CONNECTION_URL = 'mongodb+srv://juoznark:databaseaccess@cluster0.ykwf6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

app.use(express.json());

app.use('/users', usersRoutes);

app.get('/', (req, res) => res.send('Hello from Homepage.'));

app.post('/register', [
    check('firstName').exists({checkFalsy: true}).withMessage("Cannot be empty").isLength({min: 3}).withMessage("Minimum lenght is 3 symbols"),
    check('lastName').exists({checkFalsy: true}).withMessage("Cannot be empty").isLength({min: 3}).withMessage("Minimum lenght is 3 symbols"),
    check('age').exists({checkFalsy: true}).withMessage("Cannot be empty").isInt().withMessage("Age has to be a number"),
    check('email').exists({checkFalsy: true}).withMessage("Cannot be empty").isEmail().withMessage("Wrong email format"),
    check('password').exists({checkFalsy: true}).withMessage("Cannot be empty").isLength({ min: 5 }).withMessage("Minimum length is 5 symbols"),
    check('role').isIn(['member', 'admin']).withMessage("Role has to be either member or admin"),
], register);

app.post("/login", login);

app.get("/welcome", verifyToken, (req, res) => {
    res.status(200).send("Welcome!");
});

app.post('/token', newToken);

app.delete('/logout', logout);

app.use('/items', itemRoutes);

app.use('/comments', commentRoutes);

app.use('/categories', categoryRoutes);

app.use('/users/:userId/items', userItemRoutes);

app.use('/users/:userId/items/:itemId/comments', userItemCommentRoutes);