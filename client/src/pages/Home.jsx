import { Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_USER } from '../utils/queries';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import AccountModal from '../components/accountModal';

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
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          {user._id} <br></br>
          {user.username}
        </div>
        <div>

          {aData.map((account) => (
            <div key={account._id}>
              <p>{account.name}</p>
              <Link to={`/singleAccount/${account.name}`}>
                <button>View Account</button>
              </Link>
            </div>
          )
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
