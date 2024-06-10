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
    <header>
      {auth.loggedIn() ? (
        <p className='loggedFiller'></p>
        
      ):(<p className='filler'></p>)}
      
            <h1>BudgetBuddy</h1>
            
            {/* nav element to hold buttons to navigate to other pages */}
            <nav>
                {/* if logged in, display profile link and logout button */}
            {auth.loggedIn() ? (
            <div className='loggedNav'>
              <h4>
                Welcome, {auth.getProfile().data.username}
              </h4>
              <button onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            // if not logged in, display login/signup buttons to navigate to the respective pages
            <>
            <Link to="/Login">
            <button  >
                Login
            </button>
            </Link>
            <Link to="/Signup">
            <button >
                Signup
            </button>
            </Link>
            </>
          )}
            </nav>
        
    </header>
)
};

export default Header;