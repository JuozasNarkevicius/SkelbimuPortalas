import mongoose from 'mongoose';

const categorySchema = mongoose.Schema({
    title: String
});

const CategoryModel = mongoose.model('CategoryModel', categorySchema);

export default CategoryModel;