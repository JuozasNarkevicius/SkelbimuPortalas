import mongoose from 'mongoose';
import CommentModel from '../models/commentModel.js';

export const getComments = async (req, res) => {
    try {
        const comments = await CommentModel.find();

        res.status(200).json(comments);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

export const getComment = async (req, res) => {
    const { commentId } = req.params;

    try {
        const comment = await CommentModel.findById(commentId);
        
        res.status(200).json(comment);
    } catch (error) {
        res.status(404).json({ message: `Comment with id ${commentId} not found!` });
    }
}

export const createComment = async (req, res) => {
    const comment = req.body;

    const newComment = new CommentModel(comment);

    try {
        await newComment.save();

        res.status(201).json(newComment);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

export const updateComment = async (req, res) => {
    const { commentId } = req.params;
    const comment = req.body;

    if(!mongoose.Types.ObjectId.isValid(commentId)) return res.status(404).json({ message: `Comment with id ${commentId} not found!` });

    const updatedComment = await CommentModel.findByIdAndUpdate(commentId, comment, { new: true });

    res.json(updatedComment);
}

export const deleteComment = async (req, res) => {
    const { commentId } = req.params;

    if(!mongoose.Types.ObjectId.isValid(commentId)) return res.status(404).json({ message: `Comment with id ${commentId} not found!` });

    await CommentModel.findByIdAndRemove(commentId);

    res.json({ message: "Comment deleted successfully."});
}