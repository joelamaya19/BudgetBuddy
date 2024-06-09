const { Schema, model } = require('mongoose');

const accountSchema = new Schema({
    name: {
        type: String,
        required: 'Account name required!',
        unique: true,
        maxlength: 25,
        trim: true,
    },
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'Categories'
    }],
    transactions: [{
        type: Schema.Types.ObjectId,
        ref: 'Transaction'
    }]
});

const Account = model('Account', accountSchema);

module.exports = Account;