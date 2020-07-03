import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../store/context/auth';

const Navbar = () => {
    const { auth, handleLogout } = useContext(AuthContext);
    return (
        <nav className='navbar navbar-expand-md navbar-dark main-navbard'>
            <div className='container-fluid'>
                <Link to='/' className='navbar-brand'>E-attendance</Link>
                <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarCollapse' aria-controls='navbarCollapse' aria-expanded='false' aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarCollapse'>
                    <ul className='navbar-nav ml-auto'>
                        {
                            auth &&
                            <Link to='/' className='nav-link mr-3' style={{ color: '#fff' }}>Dashboard</Link>
                        }
                        {
                            auth &&
                            <Link to='/courses' className='nav-link mr-3' style={{ color: '#fff' }}>Courses</Link>
                        }
                        {
                            auth &&
                            <Button variant="dark" style={{ color: '#fff' }} className='nav-link' onClick={handleLogout}>
                                Logout
                            </Button>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
