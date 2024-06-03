import { useQuery } from '@apollo/client';

import { QUERY_USER } from '../utils/queries';
import Auth from '../utils/auth';

const Home = () => {
    const token = Auth.getProfile();
    console.log(token);
    const { loading, data } = useQuery(QUERY_USER, {
        variables: { username: token.data.username}
    });

    console.log(data);

    const user = data?.user || [];

    if(loading){
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
          </div>
        </main>
      );
};

export default Home;
