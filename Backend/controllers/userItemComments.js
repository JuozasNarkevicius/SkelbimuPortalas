import mongoose from 'mongoose';
import CommentModel from '../models/commentModel.js';
import ItemModel from '../models/itemModel.js';
import UserModel from '../models/userModel.js';

export const getComments = async (req, res) => {
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
            res.status(404).json({ message: `User with id ${userId} does not have an item posted with id ${itemId}` });
            return;
        }
        const comments = await CommentModel.find({itemId});

        res.status(200).json(comments);
    } catch (error) {
        error.name === "CastError" ? res.status(400).json({message: "Id is in incorrect form"}) : res.status(404).json({message: error});
    }
}

export const getComment = async (req, res) => {
    const { userId, itemId, commentId } = req.params;

    try {
        const user = await UserModel.findById(userId);
        const item = await ItemModel.findById(itemId);
        const comment = await CommentModel.findById(commentId);

        if(user === null) {
            res.status(404).json({ message: `User with id ${userId} not found!` });
        }

        if(item === null) {
            res.status(404).json({ message: `Item with id ${itemId} not found!` });
        }

        if(comment === null) {
            res.status(404).json({ message: `Comment with id ${commentId} not found!` });
        }

        if(item.userId != userId) {
            res.status(404).json({ message: `User with id ${userId} does not have an item posted with id ${itemId}` });
            return;
        }

        if(comment.itemId != itemId) {
            res.status(404).json({ message: `Item with id ${itemId} does not have a comment posted with id ${commentId}` });
            return;
        }

        res.status(200).json(comment);
    } catch (error) {
        error.name === "CastError" ? res.status(400).json({message: "Id is in incorrect form"}) : res.status(404).json({message: error});
    }
}

export const createComment = async (req, res) => {
    const comment = req.body;
    const { userId, itemId } = req.params;

    try {
        const user = await UserModel.findById(userId);
        const item = await ItemModel.findById(itemId);

        if(user === null){
            res.status(404).json({ message: `User with id ${userId} not found!` });
        }

        if(item === null) {
            res.status(404).json({ message: `Item with id ${itemId} not found!` });
        }

        if(item.userId != userId) {
            res.status(404).json({ message: `User with id ${userId} does not have an item posted with id ${itemId}` });r
            return;
        }

        const newComment = new CommentModel({ ...comment, itemId});

        await newComment.save();

        res.status(201).json(newComment);
    } catch (error) {
        error.name === "CastError" ? res.status(400).json({message: "Id is in incorrect form"}) : res.status(404).json({message: error});
    }
}

export const updateComment = async (req, res) => {
    const { userId, itemId, commentId } = req.params;
    const commentBody = req.body;

    try {
        const user = await UserModel.findById(userId);
        const item = await ItemModel.findById(itemId);
        const comment = await CommentModel.findById(commentId);

        if(user === null) {
            res.status(404).json({ message: `User with id ${userId} not found!` });
        }

        if(item === null) {
            res.status(404).json({ message: `Item with id ${itemId} not found!` });
        }

        if(comment === null) {
            res.status(404).json({ message: `Comment with id ${commentId} not found!` });
        }

        if(item.userId != userId) {
            res.status(404).json({ message: `User with id ${userId} does not have an item posted with id ${itemId}` });
            return;
        }

        if(comment.itemId != itemId) {
            res.status(404).json({ message: `Item with id ${itemId} does not have a comment posted with id ${commentId}` });
            return;
        }

        const updatedComment = await CommentModel.findByIdAndUpdate(commentId, commentBody, { new: true });

        res.status(200).json(updatedComment);

    } catch (error) {
        error.name === "CastError" ? res.status(400).json({message: "Id is in incorrect form"}) : res.status(404).json({message: error});
    }
}

export const deleteComment = async (req, res) => {
    const { userId, itemId, commentId } = req.params;

    try {
        const user = await UserModel.findById(userId);
        const item = await ItemModel.findById(itemId);
        const comment = await CommentModel.findById(commentId);

        if(user === null) {
            res.status(404).json({ message: `User with id ${userId} not found!` });
        }

        if(item === null) {
            res.status(404).json({ message: `Item with id ${itemId} not found!` });
        }

        if(comment === null) {
            res.status(404).json({ message: `Comment with id ${commentId} not found!` });
        }

        if(item.userId != userId) {
            res.status(404).json({ message: `User with id ${userId} does not have an item posted with id ${itemId}` });
            return;
        }

        if(comment.itemId != itemId) {
            res.status(404).json({ message: `Item with id ${itemId} does not have a comment posted with id ${commentId}` });
            return;
        }

        await CommentModel.findByIdAndRemove(commentId);

        res.status(204).json({ message: "Comment deleted successfully."});
    } catch (error) {
        error.name === "CastError" ? res.status(400).json({message: "Id is in incorrect form"}) : res.status(404).json({message: error});
    }

}