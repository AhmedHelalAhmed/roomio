import React, { Component } from 'react';
import styles from './style.css';
import { authGET } from '../../../src/shared/utils/authAxios';

class Home extends Component {
    state = { loading: true, user: null, error: null };

    componentWillMount() {
        // make request with header token.
        authGET('/api/auth/user')
            .then((res) => {this.setState(
                this.endRequest({ user: res.data }))
            })
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
                profile
                {
                    this.state.error ?
                    <p>
                        {this.state.error}
                    </p> : null
                }
                {
                    this.state.user ?
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
