import mongoose from 'mongoose';
import ItemModel from '../models/itemModel.js';

export const getItems = async (req, res) => {
    try {
        const items = await ItemModel.find();

        res.status(200).json(items);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

export const getItem = async (req, res) => {
    const { itemId } = req.params;

    try {
        const item = await ItemModel.findById(itemId);
        
        res.status(200).json(item);
    } catch (error) {
        res.status(404).json({ message: `Item with id ${itemId} not found!` });
    }
}

export const createItem = async (req, res) => {
    const item = req.body;

    const newItem = new ItemModel(item);

    try {
        await newItem.save();

        res.status(201).json(newItem);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

export const updateItem = async (req, res) => {
    const { itemId } = req.params;
    const item = req.body;

    if(!mongoose.Types.ObjectId.isValid(itemId)) return res.status(404).json({ message: `Item with id ${itemId} not found!`});

    const updatedItem = await ItemModel.findByIdAndUpdate(itemId, item, { new: true });

    res.json(updatedItem);
}

export const deleteItem = async (req, res) => {
    const { itemId } = req.params;

    if(!mongoose.Types.ObjectId.isValid(itemId)) return res.status(404).json({ message: `Item with id ${itemId} not found!`});

    await ItemModel.findByIdAndRemove(itemId);

    res.json({ message: "Item deleted successfully."});
}