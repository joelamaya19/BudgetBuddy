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

export const QUERY_SINGLE_TRANSACTION = gql`
  query getSingleTransaction($id: ID) {
    transaction(_id: $id) {
      amount
      createdAt
      name
      _id
    }
  }
`;

export const QUERY_TRANSACTIONS = gql`
query getTransactions() {
    transaction() {
      amount
      createdAt
      name
      _id
    }
  }
`;

export const QUERY_CATEGORIES = gql`
    query getCategory {
        categories {
        _id
        name
        transactions {
            amount
            createdAt
            name
            _id
        }
        }
    }
  `;

  export const QUERY_ACCOUNTS = gql`
    query getAccount {
        account {
        _id
        name
        userId
        categories {
            _id
            name
            transactions {
            _id
            amount
            createdAt
            name
            }
        }
        transactions {
            _id
            amount
            createdAt
            name
        }
        }
    }
  `;