import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_ACCOUNT } from '../utils/queries';
import Auth from '../utils/auth';

const SingleAccount = () => {
    const userInfo = Auth.getProfile();
    console.log(userInfo)
    const { accountName } = useParams();
    console.log(accountName);
    console.log(userInfo);
    const { loading, data } = useQuery(QUERY_SINGLE_ACCOUNT, {
        variables: {userName: userInfo.data.username}
    });
    console.log(data);

    const accounts = data?.account || []
    console.log(accounts, 'user')
    if (loading) {
        return (
          <div>Loading...</div>
        );
    }
    return (
        // <div>
        //     {accounts.map((element) => (
            
        //         <div key={element._id}>test </div>
            
        
        //     )

        //     )}
        // </div>
        
            <div>
                {accounts.map((element) => {
                    if (element.name === accountName) {
                        return (
                            <div key={element._id}>{element._id} {element.categories[0].name}</div>
                        );
                    }
                })}
            </div>
        
    );
};

export default SingleAccount;