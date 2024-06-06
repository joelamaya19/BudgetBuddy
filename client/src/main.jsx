import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx'
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Transactions from './pages/Transactions';
import Categories from './pages/Categories';
import Accounts from './pages/Accounts';
import SingleAccount from './pages/SingleAccount.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/transactions',
        element: <Transactions />
      }, {
        path: '/categories',
        element: <Categories />
      }, {
        path: '/accounts',
        element: <Accounts />
      }, {
        path: '/singleAccount/:accountName',
        element: <SingleAccount/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
