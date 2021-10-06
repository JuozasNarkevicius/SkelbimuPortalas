import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
    text: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
    itemId: String
});

const CommentModel = mongoose.model('CommentModel', commentSchema);

export default CommentModel;