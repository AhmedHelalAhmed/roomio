import React, { Component } from 'react';
import { authGET } from '../../../shared/utils/authAxios';

class Conversations extends Component {
    state = {
        conversations: [],
        loading: false
    }

    componentWillMount() {
        authGET('/user/conversations')
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