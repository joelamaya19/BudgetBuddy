import { useState, useEffect } from "react";
import { useMutation } from '@apollo/client';

// Queries and Mutations
import { ADD_ACCOUNT } from "../../utils/mutations";
import { QUERY_ACCOUNTS, QUERY_USER, QUERY_SINGLE_ACCOUNT} from "../../utils/queries";

// Auth
import Auth from '../../utils/auth';

const AccountForm = () => {
    const [name, setName] = useState('');

    // useEffect(() => {
    //     console.log(name);
    // }, [name]);

    const [characterCount, setCharacterCount] = useState(0);

    const [addAccount, {error}] = useMutation(
        ADD_ACCOUNT, {
            refetchQueries: [
                QUERY_USER
            ]
        }
    );

    // On submit account is added.
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(name);
        try {
            
            const { data } = await addAccount({
                variables: {name: name},
            });
            // console.log(data);

            setName('');
        } catch (err) {
            console.log(err);
        }
    };

    // updates to show account name?
    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'name' && value.length <= 30) {
            setName(value);
            setCharacterCount(value.length);
        }
    };

    // How is it going to look int the front end?
    return (
        <div style={styles.container}>
            <form onSubmit={handleFormSubmit} style={styles.form}>
                <label htmlFor="name" style={styles.label}>Account Name:</label>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    style={styles.input}
                />
                <p style={styles.characterCount}>{characterCount}/30</p>
                <button type="submit" style={styles.button}>Add Account</button>
            </form>
            {error && <p style={styles.error}>Something went wrong. Please try again.</p>}
        </div>
    );
};

// will be deleted once css has been added
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '50px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    label: {
        marginBottom: '10px',
        fontWeight: 'bold',
    },
    input: {
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    characterCount: {
        marginBottom: '10px',
        fontSize: '12px',
        color: '#999',
    },
    button: {
        padding: '10px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#007bff',
        color: '#fff',
        cursor: 'pointer',
    },
    error: {
        marginTop: '10px',
        color: 'red',
    }

};

export default AccountForm;