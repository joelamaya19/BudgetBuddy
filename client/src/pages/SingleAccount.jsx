import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import TransactionModal from '../components/transactionModal';


import { QUERY_ME, QUERY_SINGLE_ACCOUNT } from '../utils/queries';
import Auth from '../utils/auth';

const SingleAccount = () => {
    const userInfo = Auth.getProfile();

    const { accountName } = useParams();

    console.log(userInfo);
    const { loading, data } = useQuery(QUERY_SINGLE_ACCOUNT);
    console.log(data);


    const accounts = data?.account || [];

    console.log(accounts, 'accounts')

    if (loading) {
        return (
            <div>Loading...</div>
        );
    }
    return (
        <div>
            <div>
                <Link to={`/`}>
                    <button>Home</button>
                </Link>
                <TransactionModal />
            </div>

            <div>
                <div> {accounts && accounts.map((account) => {
                    if (account.name === accountName) {
                        return (
                            <div key={account._id} className="accountInfo">
                                <div className="categories">
                                    <div>{account.categories && account.categories.map((category) => {
                                        return (
                                            <div key={category._id}>
                                                <div >{category.name}</div>
                                                <div>
                                                    {category.transactions && category.transactions.map((transaction) => {
                                                        return (
                                                            <div key={transaction._id}>{transaction.name} </div>
                                                        )
                                                    }
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    })}</div>
                                </div>

                            </div>
                        );
                    }
                    return null;
                })}
                </div>

            </div>
        </div>

    );
};

export default SingleAccount;
