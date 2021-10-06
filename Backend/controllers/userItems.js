import mongoose from 'mongoose';
import ItemModel from '../models/itemModel.js';
import UserModel from '../models/userModel.js';

export const getItems = async (req, res) => {
    const { userId } = req.params;

    try {

        const user = await UserModel.findById(userId);

        if(user === null) {
            res.status(404).json({ message: `User with id ${userId} not found!` });
        }

        const items = await ItemModel.find({userId});

        res.status(200).json(items);
    } catch (error) {
        error.name === "CastError" ? res.status(400).json({message: "Id is in incorrect form"}) : res.status(404).json({message: error});
    }
}

export const getItem = async (req, res) => {
    const { userId, itemId } = req.params;

    try {
        const user = await UserModel.findById(userId);
        const item = await ItemModel.findById(itemId);

        if(user === null) {
            res.status(404).json({ message: `User with id ${userId} not found!` });
        }

        if(item === null) {
            res.status(404).json({ message: `Item with id ${itemId} not found!` });
        }

        if(item.userId != userId) {
            res.status(404).json({ message: `User does not have an item posted with id ${itemId}` });
        }
        
        res.status(200).json(item);
    } catch (error) {
        error.name === "CastError" ? res.status(400).json({message: "Id is in incorrect form"}) : res.status(404).json({message: error});
    }
}

export const createItem = async (req, res) => {
    const item = req.body;
    const { userId } = req.params;

    try {
        const user = await UserModel.findById(userId);

        if(user === null){
            res.status(404).json({ message: `User with id ${userId} not found!` });
        }

        const newItem = new ItemModel({ ...item, userId});

        await newItem.save();

        res.status(201).json(newItem);
    } catch (error) {
        error.name === "CastError" ? res.status(400).json({message: "Id is in incorrect form"}) : res.status(404).json({message: error});
    }
}

export const updateItem = async (req, res) => {
    const { userId, itemId } = req.params;
    const itemBody = req.body;

    try {

        const user = await UserModel.findById(userId);
        const item = await ItemModel.findById(itemId);

        if(user === null) {
            res.status(404).json({ message: `User with id ${userId} not found!` });
        }

        if(item === null) {
            res.status(404).json({ message: `Item with id ${itemId} not found!` });
        }

        if(item.userId !== userId) {
            res.status(404).json({ message: `User does not have an item posted with id ${itemId}` });
            return;
        }

        const updatedItem = await ItemModel.findByIdAndUpdate(itemId, itemBody, { new: true });

        res.status(200).json(updatedItem);
    } catch (error) {
        error.name === "CastError" ? res.status(400).json({message: "Id is in incorrect form"}) : res.status(404).json({message: error});
    }
}

export const deleteItem = async (req, res) => {
    const { userId, itemId } = req.params;

    try {
        const user = await UserModel.findById(userId);
        const item = await ItemModel.findById(itemId);

        if(user === null) {
            res.status(404).json({ message: `User with id ${userId} not found!` });
        }

        if(item === null) {
            res.status(404).json({ message: `Item with id ${itemId} not found!` });
        }

        if(item.userId !== userId) {
            res.status(404).json({ message: `User does not have an item posted with id ${itemId}` });
            return;
        }

        await ItemModel.findByIdAndRemove(itemId);

        res.status(204).json({ message: "Item deleted successfully."});

    } catch (error) {
        error.name === "CastError" ? res.status(400).json({message: "Id is in incorrect form"}) : res.status(404).json({message: error});
    }

}