import express from 'express';
//import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import usersRoutes from './routes/users.js';
import itemRoutes from './routes/items.js';
import commentRoutes from './routes/comments.js';
import categoryRoutes from './routes/categories.js';

import userItemRoutes from './routes/userItems.js';
import userItemCommentRoutes from './routes/userItemComments.js';

const app = express();
const PORT = 5000;
const CONNECTION_URL = 'mongodb+srv://juoznark:databaseaccess@cluster0.ykwf6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

//mongoose.set('useFindAndModify', false);

app.use(express.json());

app.use('/users', usersRoutes);

app.get('/', (req, res) => res.send('Hello from Homepage.'));



app.use('/items', itemRoutes);

app.use('/comments', commentRoutes);

app.use('/categories', categoryRoutes);

app.use('/users/:userId/items', userItemRoutes);

app.use('/users/:userId/items/:itemId/comments', userItemCommentRoutes);





//app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));