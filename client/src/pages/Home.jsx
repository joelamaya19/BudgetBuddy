import { Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_USER } from '../utils/queries';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import AccountModal from '../components/accountModal';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
const Home = () => {
  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />;
  }

  const token = Auth.getProfile();


  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username: token.data.username }
  });

  console.log(data, 'data');
  const user = data?.user || [];
  const aData = data?.user.accounts;
  console.log(aData, 'account data');

 
  console.log(user, 'user')
  if (loading) {
    return (
      <div>Loading...</div>
    );
  }

  if(aData.length == 0) {
    return (
      <div>
        <div>
          No accounts found.
        </div>
        <AccountModal/>
      </div>
    )
  }

  return (
    <main className='homeContainer'>
      
        <h3>
          {user.username}'s Accounts:
        </h3>
        <div>
        
          {aData.map((account) => (
            <Card className='accountCard' key={account._id}>
              <Card.Body>
                <Card.Title>{account.name}</Card.Title>
                <Card.Text>Balance: $ {account.balance}</Card.Text>
              <Link to={`/singleAccount/${account.name}`}>
                <Button variant="secondary">View Account</Button>
              </Link>
              </Card.Body>
            </Card>
          )
          )}
          <AccountModal />
        </div>
      
    </main>
  );
};

export default Home;
