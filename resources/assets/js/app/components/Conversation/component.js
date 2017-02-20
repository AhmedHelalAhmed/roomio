import React, { Component } from 'react';
import io from 'socket.io-client';
import {
  SOCKET_SERVER,
  NEW_MESSAGE,
  JOIN_ROOM,
  LEAVE_ROOM,
  SEND_MESSAGE,
} from '../../../shared/constants/socket';
import {
  fetchMessages,
  addMessage,
  updateMessageField,
} from './actions';
import { authGET } from '../../../shared/utils/authAxios';
import styles from './styles.css';
import MessageList from './components/MessageList';

class Conversation extends Component {
  constructor() {
    super();
    this.socket = io(SOCKET_SERVER);
  }

  componentWillMount() {
    this.props.dispatch(fetchMessages(this.props.params.id));
    this.socket.emit(JOIN_ROOM, { conversationId: this.props.params.id });
    this.socket.on(NEW_MESSAGE, this.newMessage);
  }

  componentWillUnmount() {
    this.socket.emit(LEAVE_ROOM, { conversationId: this.props.params.id });
    this.socket = null;
  }

  newMessage = ({ content, name }) => {
    this.props.dispatch(
      addMessage({ content, user: { name } })
    );
  }

  sendMessage = (e) => {
    e.preventDefault();
    const { message } = this.props.conversation;
    if (message) {
      this.socket.emit(SEND_MESSAGE, {
          content: message,
          token: window.user.token,
          conversationId: this.props.params.id
      });
      this.newMessage({
        content: message,
        name: window.user.name
      });
      this.props.dispatch(
        updateMessageField('')
      );
    } else {
      console.log('error sending');
    }
  }

  render() {
      const { conversation } = this.props;
      return (
        <div className={styles.socket_test}>
          <form onSubmit={this.sendMessage}>
            <input
                type="text"
                name="message"
                value={this.props.conversation.message}
                onChange={(e) => {
                  this.props.dispatch(
                    updateMessageField(e.target.value)
                  );
                }}
            />
            <button type="submit">
                Send
            </button>
          </form>
          <MessageList
            messages={conversation.messages}
            className={styles.chat}
          />
        </div>
      );
  }
};

export default Conversation;
