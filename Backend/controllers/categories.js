import CategoryModel from '../models/categoryModel.js';
import { validationResult } from 'express-validator';

export const getCategories = async (req, res) => {
    try {
        const categories = await CategoryModel.find();

        res.status(200).json(categories);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

export const getCategory = async (req, res) => {
    const { categoryId } = req.params;

    try {
        const category = await CategoryModel.findById(categoryId);

        if (category === null) {
            res.status(404).json({ message: `Category with id ${categoryId} not found!` });
        }
        
        res.status(200).json(category);
    } catch (error) {
        error.name === "CastError" ? res.status(400).json({message: "Id is in incorrect form"}) : res.status(404).json({message: error});
    }
}

export const createCategory = async (req, res) => {
    const category = req.body;

    if ( req.user.role !== 'admin') {
        return res.sendStatus(403).json();
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newCategory = new CategoryModel(category);

    try {
        await newCategory.save();

        res.status(201).json(newCategory);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

export const updateCategory = async (req, res) => {
    const { categoryId } = req.params;
    const categoryBody = req.body;

    if ( req.user.role !== 'admin') {
        return res.sendStatus(403).json();
    }

    try {
        const category = await CategoryModel.findById(categoryId);

        if(category === null) {
            res.status(404).json({ message: `Category with id ${categoryId} not found!` });
        }

        const updatedCategory = await CategoryModel.findByIdAndUpdate(categoryId, categoryBody, { new: true });

        res.status(200).json(updatedCategory);
    } catch (error) {
        error.name === "CastError" ? res.status(400).json({message: "Id is in incorrect form"}) : res.status(404).json({message: error});
    }
}

export const deleteCategory = async (req, res) => {
    const { categoryId } = req.params;

    if ( req.user.role !== 'admin') {
        return res.sendStatus(403).json();
    }

    try {
        const category = await CategoryModel.findById(categoryId);

        if(category === null) {
            res.status(404).json({ message: `Category with id ${categoryId} not found!` });
        }
        await CategoryModel.findByIdAndRemove(categoryId);

        res.status(204).send();
    } catch (error) {
        error.name === "CastError" ? res.status(400).json({message: "Id is in incorrect form"}) : res.status(404).json({message: error});
    }
}