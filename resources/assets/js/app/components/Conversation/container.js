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
import Conversation from './component';

class ConversationContainer extends Component {
  socket = io(SOCKET_SERVER);
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
  }

  render() {
    return (
      <Conversation
        {...this.props}
        sendMessage={this.sendMessage}
      />
    );
  }
}

const mapStateToProps = state => ({
  conversation: state.conversation,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
}

const ConnectedConversation = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConversationContainer);

export default ConnectedConversation;