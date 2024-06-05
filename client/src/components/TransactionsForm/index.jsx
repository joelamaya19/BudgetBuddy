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
    const [addTransaction, { error, data }] = useMutation(ADD_TRANSACTION);
    const aData = categoryData?.account;
    
    console.log(categoryData, 'catadata')
    useEffect(() => {
        console.log(formState)
    }, [formState]);

    console.log(aData);
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addTransaction({
                variables: { ...formState },
            });

        } catch (e) {
            console.error(e);
        }

        
    };

    const handleChange = async (event) => {
        const { name, value } = event.target;
        if (value === 'showForm') {
            setShowForm(true);
        }
        setFormState({
            ...formState,
            [name]: value
        });
    };

    if (loading) return <p>Loading...</p>;

    return (
        <main className="flex-row justify-center mb-4">
            <div className="col-12 col-lg-10">
                <div className="card">
                    <h4 className="card-header bg-dark text-light p-2">New Category</h4>
                    <div className="card-body">

                        <select name="accountId"
                            onChange={handleChange}>
                            {aData.map((account) => (
                                <option key={account._id} value={account._id}>
                                    {account.name}
                                </option>

                            ))}
                            <option value='showForm'>
                                Add Category
                            </option>
                        </select>
                        <div>
                            {showForm ? (
                                <div>
                                    <CategoryForm />
                                </div>
                            ) : (
                                <div>
                                    this is the input I want
                                </div>
                            )}
                            <div>
                                <form onSubmit={handleFormSubmit}>
                                    <input
                                        className="form-input"
                                        placeholder="Transaction name..."
                                        name="name"
                                        type="text"
                                        value={formState.name}
                                        onChange={handleChange}
                                    />
                                    <input
                                        className="form-input"
                                        placeholder="Transaction amount"
                                        name="amount"
                                        type="text"
                                        value={formState.amount}
                                        onChange={handleChange}
                                    />

                                    <button
                                        className="btn btn-block btn-primary"
                                        style={{ cursor: 'pointer' }}
                                        type="submit"
                                    >
                                        Submit
                                    </button>
                                </form>
                            </div>

                            {error && (
                                <div className="my-3 p-3 bg-danger text-white">
                                    {error.message}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default TransactionForm;