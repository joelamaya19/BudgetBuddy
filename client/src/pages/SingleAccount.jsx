import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import TransactionModal from '../components/transactionModal';


import { QUERY_ME, QUERY_SINGLE_ACCOUNT } from '../utils/queries';
import Auth from '../utils/auth';
import CategoryModal from '../components/categoryModal';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

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
        <div className='singleAccContainer'>
            <div>
                <Link to={`/`}>
                    <button class="btn btn-primary accBtn">Home</button>
                </Link>
                <CategoryModal />
                <TransactionModal />

            </div>

            <div classname='categoryCard'>
                <div> {accounts && accounts.map((account) => {
                    if (account.name === accountName) {
                        if (account.categories.length === 0) {
                            return (
                                <Card style={{ marginBottom: '10px', marginTop: '10px', width: '18rem', textAlign: 'center' }}>
                                    <Card.Title>
                                        No categories to display.
                                    </Card.Title>
                                </Card>
                            )
                        }
                        return (
                            <Card border='info' style={{ marginBottom: '10px', marginTop: '10px', width: '20rem', textAlign: 'center' }} key={account._id}>
                                <Card.Title>Account Information</Card.Title>
                                {account.categories && account.categories.map((category) => {
                                    if (category.transactions.length === 0) {
                                        return (
                                            <Card border='info' style={{ margin: '10px' }} key={category._id}>
                                                <Card.Title >Category: {category.name} <br></br>
                                                    Balance: $<br></br>
                                                    Transactions:
                                                </Card.Title>
                                                <div>No transactions to display.</div>
                                            </Card>
                                        )
                                    }
                                    return (
                                        <Card border='info' style={{ margin: '10px' }} key={category._id}>
                                            <Card.Title >Category: {category.name} <br></br>
                                                Balance: $<br></br>
                                                Transactions:
                                            </Card.Title>

                                            {category.transactions.map((transaction) => {

                                                return (
                                                    <div key={transaction._id}>
                                                        <div>{transaction.name}: ${transaction.amount}</div>
                                                    </div>
                                                )


                                            }
                                            )}
                                        </Card>
                                    )
                                })}
                            </Card>
                        );
                    }
                })}
                </div>
            </div>
        </div>
    );
};

export default SingleAccount;
