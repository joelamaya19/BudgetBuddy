const { Schema, model } = require('mongoose');
const { Transaction } = require('../models');

const categoriesSchema = new Schema({
    name: {
        type: String,
        required: 'Enter a valid category name!',
        unique: true,
        maxlength: 25,
        trim: true,
    },
    transaction: [Transaction]
});

const Categories = model('Categories', categoriesSchema);

module.exports = Categories;