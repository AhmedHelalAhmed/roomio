import React from 'react';
import { Link } from 'react-router';
import { nav } from './style.css';

const Nav = () => {
    return (
        <nav className={nav}>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {
                    window.user ?
                    <li>
                        <Link to='/notes'>Notes</Link>
                    </li> : null
                }
                {
                    window.user ?
                    <li>
                        <Link to='/socket'>Socket</Link>
                    </li> : null
                }
                {
                    window.user ?
                    <li>
                        <a href='/logout'>Logout</a>
                    </li> :
                    <li>
                        <a href='/login'>Login</a>
                    </li>
                }
            </ul>
        </nav>
    );
};

export default Nav;
