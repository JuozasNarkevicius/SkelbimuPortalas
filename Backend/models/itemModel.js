import mongoose from 'mongoose';

const itemSchema = mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    image: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
    userId: String
});

const ItemModel = mongoose.model('ItemModel', itemSchema);

export default ItemModel;