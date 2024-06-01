const typeDefs = `
    type User {
        _id: ID
        username: String
        email: String
        password: String
        account: [Account]!
    }

    type Auth {
        token: ID!
        user: User
    }

    type Transaction {
        _id: ID!
        name: String!
        amount: Int!
        createdAt: String
    }

    type Categories {
        _id: ID!
        name: String
        transaction: [Transaction]
    }

    type Account {
        _id: ID!
        name: String
        categories: [Categories]
        transaction: [Transaction]
    }

    type Query {
        users: [User]
        user(username: String!): User
        transaction: (_id: String): [Transaction]
        categories: (_id: String): [Categories]
        account: (_id: String): [Account]
        me: User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addTransaction(categoryId: ID!, name: String!, amount: Int!): Transaction
        addCategory(accountId: ID!, name: String!): Categories
        addAccount(name: String!): Account
        removeTransaction(transactionId: ID!): Transaction
        removeCategory(categoryId: ID!): Categories 
        removeAccount(accountId: ID!): Account
    }

`;

module.exports = typeDefs;