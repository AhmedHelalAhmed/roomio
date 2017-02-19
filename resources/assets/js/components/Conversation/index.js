import React, { Component } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { SOCKET_SERVER } from '../../utils/sockets';
import { headersWithAuth } from '../../utils/headers';
import styles from './styles.css';

class Conversation extends Component {
    constructor() {
        super();
        this.state = { messages: [], message: '', otherUser: '' };
        this.socket = io(SOCKET_SERVER);
    }

    componentWillMount() {
        if (this.props.params.id) {
          axios.get(`/api/conversations/${this.props.params.id}/messages`, { ...headersWithAuth })
            .then(res => {
              const { conversation } = res.data;
              const otherUser = conversation.users.filter(user => user.name !== window.user.name).pop();
              this.setState({ 
                messages: conversation.messages.map(message => {
                  return `${message.user.name === window.user.name ? 'you' : message.user.name}: ${message.content}`;
                }),
                otherUser: otherUser.name
              })
            })
            .catch(error => console.log(error))
        }
        this.socket.on('new_message', this.newMessage);
    }

    newMessage = ({ message, name }) => {
        const messages = this.state.messages.slice();
        messages.push(`${name === window.user.name ? 'you' : name}: ${message.content}`);
        this.setState({ messages });
    }

    onInputChange = (e) => {
        this.setState({ message: e.target.value });
    }

    sendMessage = (e) => {
        e.preventDefault();
        if (this.state.message) {
            this.socket.emit('send_message', {
                content: this.state.message,
                token: window.user.token,
                conversationId: this.props.params.id
            });
            this.setState({ message: '' });
        } else {
            console.log('error sending');
        }
    }

    render() {
        return (
            <div className={styles.socket_test}>
                <h1>chat{ this.state.otherUser ? ` with ${this.state.otherUser}` : ' '}</h1>
                <ul>
                    {this.state.messages.map((message, key) => {
                        return <li key={key}>{message}</li>
                    })}
                </ul>
                <form onSubmit={this.sendMessage}>
                    <input
                        type="text"
                        name="message"
                        value={this.state.message}
                        onChange={this.onInputChange}
                    />
                    <button type="submit">
                        Send Message
                    </button>
                </form>
            </div>
        );
    }
};

export default Conversation;
