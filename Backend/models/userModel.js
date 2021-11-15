import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number,
    email: String,
    password: { type: String, select: false },
    role: String,
    token: String,
});

const UserModel = mongoose.model('UserModel', userSchema);

export default UserModel;