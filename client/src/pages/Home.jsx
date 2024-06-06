import { Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_USER } from '../utils/queries';
import { QUERY_ACCOUNTS } from '../utils/queries';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

const Home = () => {
  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />;
  }

  const token = Auth.getProfile();
  console.log(token);

  const { loading, data: accountData } = useQuery(QUERY_ACCOUNTS);
  const { data } = useQuery(QUERY_USER, {
    variables: { username: token.data.username }
  });

  console.log(data);
  const aData = accountData?.account;
  console.log(aData, 'account data');

  const user = data?.user || [];

  if (loading) {
    return (
      <div>Loading...</div>
    );
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
            <div>
              <p key={account._id}>{account.name}</p>
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
