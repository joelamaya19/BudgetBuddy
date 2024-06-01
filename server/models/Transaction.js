const { Schema, model } = require('mongoose');

const transactionSchema = new Schema({
    name: {
        type: String,
        required: 'Account name required!',
        maxlength: 25,
    },
    value: {
        type: Number,
        required: 'Enter a value!',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Transaction = model('Transaction', transactionSchema);

module.exports = Transaction;