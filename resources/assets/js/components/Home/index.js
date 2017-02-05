import React, { Component } from 'react';
import styles from './style.css';
import axios from 'axios';

const authHeaders = {
    Authorization: `Bearer ${window.user ? window.user.api_token : ''}`
};

class Home extends Component {
    state = { loading: true, user: {}, error: null }; // initial state.

    componentWillMount = () => {
        axios.get('/api/user', { headers: {...authHeaders} }) // make request with header token.
            .then((res) => this.setState(
                this.endRequest({ user: res.data }))
            )
            .catch(() => this.setState(
                this.endRequest({ error: 'no user in session' }))
            )
    }

    endRequest = (newState) => () => {
        return {
            ...newState,
            loading: false
        };
    }

    render = () => {
        if (this.state.loading) return null; // or spinner

        return (
            <div className={styles.home}>
                {
                    this.state.error ?
                    <p>
                        {this.state.error}
                    </p> : null
                }
                {
                    Object.keys(this.state.user).length ?
                    <div>
                        <p>
                            Name: {this.state.user.name}
                        </p>
                        <p>
                            Email: {this.state.user.email}
                        </p>
                    </div> : null
                }
            </div>
        );
    }
};

export default Home;
