import React, { Component } from 'react';
import io from 'socket.io-client';
import { SOCKET_SERVER } from '../../utils/sockets';
import styles from './styles.css';

class SocketTest extends Component {
    constructor() {
        super();
        this.state = { messages: [], message: '' };
        this.socket = io(SOCKET_SERVER);
    }

    componentWillMount() {
        this.socket.emit('user_connected', {
            user: window.user
        });
        this.socket.on('new_message', this.newMessage);
    }

    newMessage = ({ message, name }) => {
        const messages = this.state.messages.slice();
        messages.push(`${name}: ${message}`);
        this.setState({ messages });
    }

    onInputChange = (e) => {
        this.setState({ message: e.target.value });
    }

    sendMessage = (e) => {
        e.preventDefault();
        if (this.state.message) {
            this.socket.emit('send_message', {
                message: this.state.message
            });
            this.setState({ message: '' });
        }
    }

    render() {
        return (
            <div className={styles.socket_test}>
                <h1>chat</h1>
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
