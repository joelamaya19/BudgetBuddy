const { Schema, model } = require('mongoose');
const { Categories, Transaction } = require('../models');

const accountSchema = new Schema({
    name: {
        type: String,
        required: 'Account name required!',
        unique: true,
        maxlength: 25,
        trim: true,
    },
    categories: [Categories],
    transaction: [Transaction]
});

const Account = model('Account', accountSchema);

module.exports = Account;