import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <footer>
            <div className="container">
                {location.pathname !== '/' && (
                    <button
                        className="btn btn-dark mb-3"
                        onClick={() => navigate(-1)}
                    >
                        &larr; Go Back
                    </button>
                )}
                <h4>
                    Made by the Three Musketeers.
                </h4>
                <div>
                    <p className='contact'>Contact Us:</p>
                    <ul className='social-links'>
                        <li>
                            <a className="gabi" href="https://github.com/NotSnowWhite">
                                Gabi Latch
                            </a>
                        </li>
                        <li>
                            <a className="kyle" href="https://github.com/KyleH-Git">
                                Kyle Hayden
                            </a>
                        </li>
                        <li>
                            <a className="joel" href="https://github.com/joelamaya19">
                                Joel Amaya
                            </a>
                        </li>
                    </ul>

                </div>

            </div>
        </footer>
    )
};

export default Footer;
