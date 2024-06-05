

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
                    console.log(account) 
                ))}
        </div>
    );
};

export default AccountList;