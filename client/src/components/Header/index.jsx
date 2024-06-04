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
                <p>A comprehensive expense tracker that helps you stick to your budget and track where your money is going....</p>
            </div>
            {/* nav element to hold buttons to navigate to other pages */}
            <nav>
                {/* if logged in, display profile link and logout button */}
            {auth.loggedIn() ? (
            <>
              <Link className="btn profile-btn m-2" to="/">
                {auth.getProfile().data.username}'s profile
              </Link>
              <button className="btn logout-btn m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            // if not logged in, display login/signup buttons to navigate to the respective pages
            <>
              <Link className="btn login-btn m-2" to="/login">
                Login
              </Link>
              <Link className="btn signup-btn m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
            </nav>
        </div>
    </header>
)
};

export default Header;