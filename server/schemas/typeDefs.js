const typeDefs = `
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        accounts: [Account]!
    }

    type Auth {
        token: ID!
        user: User
    }

    type Transaction {
        _id: ID!
        name: String
        amount: Int
        createdAt: String
    }

    type Category {
        _id: ID!
        name: String!
        transactions: [Transaction]
    }

    type Account {
        _id: ID!
        name: String!
        userId: ID!
        categories: [Category]
        transactions: [Transaction]
    }

    type Query {
        users: [User]
        user(username: String!): User
        transaction(_id: ID): [Transaction]
        categories(_id: ID): [Category]
        account(username: String): [Account] 
        me: User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addTransaction(accountId: ID!, categoryId: ID!, name: String!, amount: Int!): Transaction
        addCategory(accountId: ID!, name: String!): Category
        addAccount(name: String!): Account
        removeTransaction(transactionId: ID!): Transaction
        removeCategory(categoryId: ID!): Category 
        removeAccount(accountId: ID!): Account
    }
`;

module.exports = typeDefs;
