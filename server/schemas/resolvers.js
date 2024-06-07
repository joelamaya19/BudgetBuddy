const { User, Account, Categories, Transaction } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        // Query to get all users with their associated accounts
        users: async () => {
            return User.find().populate('accounts');
        },
        // Query to get a specific user by username with their associated accounts
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('accounts');
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('accounts').populate({
                    path: 'accounts', populate: 'categories'
                });
            }
            throw AuthenticationError;
        },
        // Query to get accounts, optionally filtered by username
        account: async (parent, { username }) => {
            console.log(username);
            const params = username ? { username } : {};
            return Account.find(params).populate("categories").populate({
                path: 'categories', populate: 'transactions'
            });
        },
        // Query to get categories, optionally filtered by _id
        categories: async (parent, { _id }) => {
            const params = _id ? { _id } : {};
            return Categories.find(params).populate("transactions");
        },
        // Query to get transactions, optionally filtered by _id
        transaction: async (parent, { _id }) => {
            const params = _id ? { _id } : {};
            return Transaction.find(params);
        }

    },

    Mutation: {
        // Mutation to add a new user
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        // Mutation to login with existing credentials
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user || !(await user.isCorrectPassword(password))) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return { token, user };
        },
        // Mutation to add a new transaction
        addTransaction: async (parent, { accountId, categoryId, name, amount }, context) => {
            if (context.user) {
                const transaction = await Transaction.create({ name, amount });
                await Categories.findByIdAndUpdate(categoryId, {
                    $push: { transactions: transaction._id },
                });
                await Account.findByIdAndUpdate(accountId, {
                    $push: { transactions: transaction._id },
                });
                return transaction;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        // Mutation to add a new category
        addCategory: async (parent, { name, accountId }, context) => {
            if (context.user) {
                console.log(name, accountId)
                const category = await Categories.create({ name });
                console.log(category);
                await Account.findByIdAndUpdate(accountId, {
                    $push: { categories: category._id },
                });
                return category;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        // Mutation to add a new account
        addAccount: async (parent, { name }, context) => {
            if (context.user) {
                const account = await Account.create({ name, userId: context.user._id });
                await User.findByIdAndUpdate(context.user._id, {
                    $push: { accounts: account._id },
                });
                return account;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        // Mutation to remove a transaction
        removeTransaction: async (parent, { transactionId }, context) => {
            if (context.user) {
                // Find the transaction by ID
                const transaction = await Transaction.findById(transactionId);
                if (!transaction) {
                    throw new Error('Transaction not found');
                }

                // Ensure the transaction belongs to the logged-in user
                if (transaction.user.toString() !== context.user._id) {
                    throw new Error('You are not authorized to delete this transaction');
                }

                // Delete the transaction
                await Transaction.findByIdAndDelete(transactionId);
                return transaction;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        // Mutation to remove a category
        removeCategory: async (parent, { categoryId }, context) => {
            if (context.user) {
                // Find the category by ID
                const category = await Categories.findById(categoryId);
                if (!category) {
                    throw new Error('Category not found');
                }

                // Ensure the category belongs to the logged-in user
                if (category.user.toString() !== context.user._id) {
                    throw new Error('You are not authorized to delete this category');
                }

                // Delete the category
                await Categories.findByIdAndDelete(categoryId);
                return category;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        // Mutation to remove a account
        removeAccount: async (parent, { accountId }, context) => {
            if (context.user) {
                // Find the account by ID
                const account = await Account.findById(accountId);
                if (!account) {
                    throw new Error('Account not found');
                }

                // Ensure the account belongs to the logged-in user
                if (account.user.toString() !== context.user._id) {
                    throw new Error('You are not authorized to delete this account');
                }

                // Delete the account
                await Account.findByIdAndDelete(accountId);
                return account;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },
};

module.exports = resolvers;