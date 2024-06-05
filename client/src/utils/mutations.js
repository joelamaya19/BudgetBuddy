import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;  

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_ACCOUNT = gql`
  mutation addAccount($name: String!) {
    addAccount(name: $name) {
      _id
      name
      userId
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation addCategory($accountId: ID!, $name: String!) {
    addCategory(accountId: $accountId, name: $name) {
      _id
      name
    }
  }
`;

export const ADD_TRANSACTION = gql`
  mutation addTransaction($categoryId: ID!, $name: String!, $amount: Int!) {
    addTransaction(categoryId: $categoryId, name: $name, amount: $amount) {
      _id
      amount
      createdAt
      name
    }
  }
`;


export const DELETE_ACCOUNT = gql`
  mutation removeAccount($accountId: ID!) {
    removeAccount(accountId: $accountId) {
      _id
    }
  }
`;


export const DELETE_CATEGORY = gql`
  mutation removeCategory($categoryId: ID!) {
    removeCategory(categoryId: $categoryId) {
      _id
    }
  }
`;


export const DELETE_TRANSACTION = gql`
  mutation removeTransaction($transactionId: ID!) {
    removeTransaction(transactionId: $transactionId) {
      _id
    }
  }
`;