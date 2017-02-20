import React, { Component } from 'react';
import { Link } from 'react-router';
import { authGET } from '../../../shared/utils/authAxios';

class Conversations extends Component {
    state = {
        conversations: [],
        loading: false
    }

    componentWillMount() {
        authGET('/api/user/conversations')
            .then((res) => {
                const { conversations } = res.data;
                this.setState({ conversations });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <h1>Conversations</h1>
                <ul>
                {this.state.conversations.map((chat, index) => {
                    return (
                        <li key={index}>
                            <Link to={`conversation/${chat.id}`}>
                              {chat.users[0].name} & {chat.users[1].name}
                            </Link>
                        </li>
                    );
                })}
                </ul>
            </div>
        );
    }
}

export default Conversations;