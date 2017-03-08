import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  addRoom,
  addTopic,
} from '../redux/ducks/entitiesDucks';
import io from 'socket.io-client';
import { SOCKET_SERVER } from '../shared/constants/socket';

/**
 * Components
 */
import Nav from '../components/Nav';
import Active from '../components/Active';

const socket = io(SOCKET_SERVER);

class AppContainer extends Component {

  componentWillMount() {
    socket.on('check_connection', () => {
      if (this.props.params) {
        const { params: { roomName, topicRef } } = this.props;
        if (roomName) {
          socket.emit('join:room', { roomName })
        }
        if (topicRef) {
          socket.emit('join:topic', { topicRef, roomName })
        }
      }
    });
  }

  render() {
    return (
      <div className="app-container">
        <Nav
          location={this.props.location}
        />
        <Active
          children={this.props.children}
          socket={socket} 
        />
      </div>
    );
  }
}

AppContainer.propTypes = {
  children: PropTypes.object.isRequired,
};

export default AppContainer;
