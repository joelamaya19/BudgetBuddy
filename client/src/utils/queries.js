import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query getUser($username: String!) {
    user(username: $username) {
      _id
      email
      username
      accounts {
        name
        userId
        _id
      }
    }
  }
`;

export const QUERY_ME = gql`
query me {
  me {
    _id
    username
    email
    accounts {
      _id
      name
    }
  }
}
`;

export const QUERY_SINGLE_TRANSACTION = gql`
query getSingleTransaction($id: ID) {
  transaction(_id: $id) {
    _id
    name
    amount
    createdAt
  }
}
`;

export const QUERY_TRANSACTIONS = gql`
query getTransactions {
  transaction {
    _id
    name
    amount
    createdAt
  }
}
`;

export const QUERY_SINGLE_CATEGORIES = gql`
query getSingleCategories($id: ID) {
  categories(_id: $id) {
    _id
    name
    transactions {
      _id
      name
      amount
      createdAt
    }
  }
}
`;

export const QUERY_CATEGORIES = gql`
query getCategories {
  categories {
    _id
    name
  }
}
`;

export const QUERY_SINGLE_ACCOUNT = gql`
query getSingleAccount($username: String) {
  account(username: $username) {
    _id
    name
    userId
    categories {
      _id
      name
    }
  }
}
`;

export const QUERY_ACCOUNTS = gql`
query getAccounts {
  account {
    _id
    name
    userId
  }
}
`;