// import link module and the functions from auth
import { Link } from 'react-router-dom';
import auth from '../../utils/auth';

const Header = () => {
// call logout() from auth, prevent default, and save in a variable called logout
const logout = (event) => {
    event.preventDefault();
    auth.logout();
};

return (
    <header className= "flex-row align-center">
        <div className= "container">
            <div>
                <h1>BudgetBuddy</h1>
            </div>
            {/* nav element to hold buttons to navigate to other pages */}
            <nav>
                {/* if logged in, display profile link and logout button */}
            {auth.loggedIn() ? (
            <>
              <h2>
                Welcome {auth.getProfile().data.username}
              </h2>
              <button className="btn logout-btn m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            // if not logged in, display login/signup buttons to navigate to the respective pages
            <>
            <Link to="/Login">
            <button className="btn logout-btn m-2" >
                Login
            </button>
            </Link>
            <Link to="/Signup">
            <button className="btn logout-btn m-2" >
                Signup
            </button>
            </Link>
            </>
          )}
            </nav>
        </div>
    </header>
)
};

export default Header;