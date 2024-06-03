const { Schema, model } = require('mongoose');

const categoriesSchema = new Schema({
    name: {
        type: String,
        required: 'Enter a valid category name!',
        unique: true,
        maxlength: 25,
        trim: true,
    },
    transactions: [{
        type: Schema.Types.ObjectId,
        ref: 'Transaction'
    }]
});

const Categories = model('Categories', categoriesSchema);

module.exports = Categories;