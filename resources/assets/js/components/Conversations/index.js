import React, { Component } from 'react';
import axios from 'axios';
import { headersWithAuth } from '../../utils/headers';

class Conversations extends Component {
    state = {
        conversations: [],
        loading: false
    }

    componentWillMount() {
        axios.get('/user/conversations', { ...headersWithAuth })
            .then((res) => {
                const { conversations } = res.data;
                console.log(conversations);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <h1>Conversations</h1>
            </div>
        );
    }
}

export default Conversations;