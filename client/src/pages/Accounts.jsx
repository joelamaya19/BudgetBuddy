import { useQuery } from '@apollo/client';

import AccountForm from '../components/AccountForm';
import AccountList from '../components/AccountsList';

import { QUERY_ME, QUERY_ACCOUNTS } from '../utils/queries';

import Auth from '../utils/auth';


const Accounts = () => {
    const token = Auth.getProfile();

    console.log(token);

    const { loading, data } = useQuery(QUERY_ACCOUNTS, {
        variables: { name: token.data.name }
    });

    const account = data?.account || [];

    console.log(account);

    return (
        <main>
            <div className="flex-row justify-center">
                <div
                    className="col-12 col-md-10 mb-3 p-3"
                    style={{ border: '1px dotted #1a1a1a' }}
                >
                    <AccountForm />
                </div>
                <div className="col-12 col-md-8 mb-3">
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <AccountList
                            account={account}
                            // more props?
                        />
                    )}
                </div>
            </div>
        </main>
    );
};

export default Accounts;