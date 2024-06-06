import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_CATEGORY } from '../../utils/mutations';
import { ADD_TRANSACTION } from '../../utils/mutations';
import { QUERY_ACCOUNTS_CATEGORIES } from '../../utils/queries';
import CategoryForm from '../CategoriesForm';

const TransactionForm = () => {
    const { loading, data: categoryData } = useQuery(QUERY_ACCOUNTS_CATEGORIES);
    const [showForm, setShowForm] = useState(false);
    const [formState, setFormState] = useState({ name: '', accountId: '', amount: '', createdAt: '' });
    const [selectedAccountId, setSelectedAccountId] = useState(null);
    const [addTransaction, { error, data }] = useMutation(ADD_TRANSACTION);
  
    if (loading) return <p>Loading...</p>;

    console.log(categoryData);
  
    const handleAccountChange = (e) => {
      setSelectedAccountId(e.target.value);
    };
  
    const handleFormChange = (e) => {
      const { name, value } = e.target;
      setFormState({
        ...formState,
        [name]: value,
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await addTransaction({
          variables: {
            ...formState,
            amount: parseFloat(formState.amount),
          },
        });
      } catch (err) {
        console.error(err);
      }
    };
  
    const selectedAccount = categoryData?.account.find(acc => acc._id === selectedAccountId);
  
    return (
      <div>
        <select onChange={handleAccountChange} value={selectedAccountId || ''}>
          <option value="" disabled>Select an account</option>
          {categoryData?.account.map(acc => (
            <option key={acc._id} value={acc._id}>
              {acc.name}
            </option>
          ))}
        </select>
  
        {selectedAccount && (
          <div>
            <h3>Categories for {selectedAccount.name}</h3>
            <ul>
              {selectedAccount.categories.map(cat => (
                <li key={cat._id}>{cat.name}</li>
              ))}
            </ul>
          </div>
        )}
  
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Hide Form' : 'Show Form'}
        </button>
  
        {showForm && (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Transaction Name"
              value={formState.name}
              onChange={handleFormChange}
            />
            <input
              type="text"
              name="amount"
              placeholder="Amount"
              value={formState.amount}
              onChange={handleFormChange}
            />
            <input
              type="date"
              name="createdAt"
              placeholder="Created At"
              value={formState.createdAt}
              onChange={handleFormChange}
            />
            <button type="submit">Add Transaction</button>
          </form>
        )}
  
        {error && <p>Error: {error.message}</p>}
      </div>
    );
  };
  
  export default TransactionForm;