import React from 'react';
import { Link } from 'react-router';
import styles from './style.css';

const Nav = () => {
    return (
        <nav className={styles.nav}>
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
