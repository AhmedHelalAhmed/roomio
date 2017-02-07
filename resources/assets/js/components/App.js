import React from 'react';
import { Link } from 'react-router';

const App = (props) => {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to='/test'>Test</Link>
                    </li>
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
            <section>
                {props.children}
            </section>
        </div>
    );
};

export default App;
