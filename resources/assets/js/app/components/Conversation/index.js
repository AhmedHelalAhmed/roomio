import React, { Component } from 'react';
import io from 'socket.io-client';
import {
  SOCKET_SERVER,
  NEW_MESSAGE,
  JOIN_ROOM,
  LEAVE_ROOM,
  SEND_MESSAGE,
} from '../../../shared/constants/socket';
import { authGET } from '../../../shared/utils/authAxios';
import styles from './styles.css';

class Conversation extends Component {
  constructor() {
    super();
    this.state = { messages: [], message: '', otherUser: '' };
    this.socket = io(SOCKET_SERVER);
  }

  componentWillMount() {
    if (this.props.params.id) {
      this.conversationId = this.props.params.id;
      this.socket.emit(JOIN_ROOM, { conversationId: this.conversationId });
      authGET(`/api/conversations/${this.conversationId}/messages`)
        .then(res => {
          const { conversation } = res.data;
          const otherUser = conversation.users.filter(user => user.name !== window.user.name).pop();
          this.setState({ 
            messages: conversation.messages.reverse().map(message => {
              return `${message.user.name === window.user.name ? 'you' : message.user.name}: ${message.content}`;
            }),
            otherUser: otherUser.name
          })
        })
        .catch(error => console.log(error))
    }
    this.socket.on(NEW_MESSAGE, this.newMessage);
  }

  componentWillUnmount() {
    this.socket.emit(LEAVE_ROOM, { conversationId: this.conversationid });
    this.socket = null;
  }

  newMessage = ({ message, name }) => {
    const messages = this.state.messages.slice();
    messages.unshift(`${name === window.user.name ? 'you' : name}: ${message.content}`);
    this.setState({ messages });
  }

  onInputChange = (e) => {
    this.setState({ message: e.target.value });
  }

  sendMessage = (e) => {
    e.preventDefault();
    if (this.state.message) {
      this.newMessage({ message: { content: this.state.message }, name: window.user.name });
      this.socket.emit(SEND_MESSAGE, {
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
          <form onSubmit={this.sendMessage}>
            <input
                type="text"
                name="message"
                value={this.state.message}
                onChange={this.onInputChange}
            />
            <button type="submit">
                Send
            </button>
          </form>
          <div className={styles.chat}>
            <ul>
              {this.state.messages.map((message, key) => {
                  return <li key={key}>{message}</li>
              })}
            </ul>
          </div>
        </div>
      );
  }
};

export default Conversation;
