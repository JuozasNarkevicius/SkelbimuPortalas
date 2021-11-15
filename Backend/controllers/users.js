import UserModel from '../models/userModel.js';

export const getUsers = async (req, res) => {

    if ( req.user.role !== 'admin') {
        return res.sendStatus(403).json();
    }
    
    try {
        const users = await UserModel.find();

        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

export const getUser = async (req, res) => {
    const { userId } = req.params;
    

    try {
        const user = await UserModel.findById(userId);

        if (user === null) {
            res.status(404).json({ message: `User with id ${userId} not found!` });
        }
        
        res.status(200).json(user);
    } catch (error) {
        error.name === "CastError" ? res.status(400).json({message: "Id is in incorrect form"}) : res.status(404).json({message: error});
    }
    
}

export const createUser = async (req, res) => {
    const user = req.body;

    const newUser = new UserModel(user);

    try {
        await newUser.save();

        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

export const updateUser = async (req, res) => {
    const { userId } = req.params;
    const userBody = req.body;

    if (req.user.user_id !== userId) {
        return res.status(403).json();
    }

    try {
        const user = await UserModel.findById(userId);

        if(user === null) {
            res.status(404).json({ message: `User with id ${userId} not found!` });
        }

        const updatedUser = await UserModel.findByIdAndUpdate(userId, userBody, { new: true });

        res.status(200).json(updatedUser);
    } catch (error) {
        error.name === "CastError" ? res.status(400).json({message: "Id is in incorrect form"}) : res.status(404).json({message: error});
    }
}

export const deleteUser = async (req, res) => {
    const { userId } = req.params;

    if ( req.user.role !== 'admin') {
        return res.sendStatus(403).json();
    }

    try {
        const user = await UserModel.findById(userId);

        if(user === null) {
            res.status(404).json({ message: `User with id ${userId} not found!` });
        }

        await UserModel.findByIdAndRemove(userId);

        res.status(204).json({ message: `User deleted succesfully!`});
    } catch (error) {
        error.name === "CastError" ? res.status(400).json({message: "Id is in incorrect form"}) : res.status(404).json({message: error});
    }
}