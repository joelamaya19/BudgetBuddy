import TransactionsForm from '../components/TransactionsForm/index';
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from '../utils/queries';
import Auth from '../utils/auth'
import CategoryList from '../components/CategoriesList';

const Transactions = () => {
    const token = Auth.getProfile();

    const {loading, data } = useQuery(QUERY_CATEGORIES, {
        variables: {name: token.data.name}
    });

    
    const category = data?.categories || [];
    console.log(data, 'data array');
    console.log(category, 'category array');

    return (
        <main>
            <TransactionsForm />
        </main>
    );
};

export default Transactions;