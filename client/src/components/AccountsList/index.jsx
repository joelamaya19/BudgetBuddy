

const AccountList = ({
    account,
}) => {
    if (!account.length) {
        return <h3>No accounts created.</h3>;
    }

    // How its going to look in the front end?
    return (
        <div>
            {account &&
                account.map((account) => (
                    <div key={account._id} value="" className=""> 
                        <h4 className="">
                            <div>
                                <p>{account.name}</p>
                            </div>
                        </h4>
                    </div> 
                ))}
        </div>
    );
};

export default AccountList;