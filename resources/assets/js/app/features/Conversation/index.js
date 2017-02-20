import React, { Component } from 'react';
import io from 'socket.io-client';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  SOCKET_SERVER,
  NEW_MESSAGE,
  JOIN_ROOM,
  LEAVE_ROOM,
  SEND_MESSAGE,
} from '../../../shared/constants/socket';
import * as actions from './actions';
import { authGET } from '../../../shared/utils/authAxios';
import styles from './styles.css';
import MessageList from './components/MessageList';

class Conversation extends Component {
  socket = io(SOCKET_SERVER)

  componentWillMount() {
    console.log(this.props)
    this.props.fetchMessages(this.props.params.id);
    this.socket.emit(JOIN_ROOM, { conversationId: this.props.params.id });
    this.socket.on(NEW_MESSAGE, ({ message, name }) => {
      this.props.addMessage({ ...message, user: { name } });
    });
  }

  componentWillUnmount() {
    this.socket.emit(LEAVE_ROOM, { conversationId: this.props.params.id });
    this.socket = null;
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
      this.props.addMessage({
        content: message,
        user: {
          name: window.user.name
        }
      });
      this.props.updateMessageField('');
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
                  this.props.updateMessageField(e.target.value);
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

const mapStateToProps = state => ({
  conversation: state.conversation,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
}

const ContainerConversation = connect(
  mapStateToProps,
  mapDispatchToProps
)(Conversation);

export default ContainerConversation;
