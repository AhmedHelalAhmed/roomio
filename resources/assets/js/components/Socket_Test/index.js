import React, { Component } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { SOCKET_SERVER } from '../../utils/sockets';
import { headersWithAuth } from '../../utils/headers';
import styles from './styles.css';

class SocketTest extends Component {
    constructor() {
        super();
        this.state = { messages: [], message: '' };
        this.socket = io(SOCKET_SERVER);
    }

    componentWillMount() {
        if (this.props.params.id) {
          axios.get(`/api/conversations/${this.props.params.id}/messages`, { ...headersWithAuth })
            .then(res => 
              this.setState({ 
                messages: res.data.map(message => {
                  return `${message.user.name === window.user.name ? 'you' : message.user.name}: ${message.content}`;
                })
              })
            )
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
                <h1>chat{ this.props.params.id ? `: ${this.props.params.id}` : ' '}</h1>
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

export default SocketTest;
