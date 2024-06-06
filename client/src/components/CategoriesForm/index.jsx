import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_CATEGORY } from '../../utils/mutations';
import { QUERY_ACCOUNTS } from '../../utils/queries';

const CategoryForm = () => {

    const { loading, data: accountData } = useQuery(QUERY_ACCOUNTS);

    

    const [formState, setFormState] = useState({ name: '', accountId: ''});
    const [addCategory, { error, data }] = useMutation(ADD_CATEGORY);
    const aData = accountData?.account;

    useEffect(() => {
        console.log(formState)
    },[formState]);

    console.log(aData);
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addCategory({
                variables: { ...formState },
            });

            setFormState({name: ''});
        } catch (e) {
            console.error(e);
        }
    };

    const handleChange = async (event) => {
        const { name, value } = event.target;

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
                        <form onSubmit={handleFormSubmit}>
                            <select name="accountId"
                                onChange={handleChange}>
                                {aData.map((account) => (
                                    <option key={account._id} value={account._id}>
                                        {account.name}
                                    </option>
                                ))}
                                
                            </select>
                            <input
                                className="form-input"
                                placeholder="New Category"
                                name="name"
                                type="text"
                                value={formState.name}
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
                        {error && (
                            <div className="my-3 p-3 bg-danger text-white">
                                {error.message}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CategoryForm;