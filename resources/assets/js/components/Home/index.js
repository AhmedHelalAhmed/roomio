import React, { Component } from 'react';
import styles from './style.css';
import axios from 'axios';

const authHeaders = {
    Authorization: `Bearer ${window.user ? window.user.token : ''}`
};

class Home extends Component {
    state = { loading: true, user: {}, error: null };

    componentWillMount = () => {
        axios.get('/api/user', { headers: {...authHeaders} })
        .then((res) => this.setState(this.endRequest({ user: res.data })) )
        .catch((err) => this.setState(this.endRequest({ error: 'no user in session'})) )
    }

    endRequest = (newState) => () => {
        return {
            ...newState,
            loading: false
        };
    }

    render = () => {
        if (this.state.loading) return null;

        return (
            <div className={styles.home}>
                {
                    this.state.error ?
                    <p>{this.state.error}</p> : null
                }
                <p>{this.state.user.name}</p>
                <p>{this.state.user.email}</p>
            </div>
        );
    }
};

export default Home;
