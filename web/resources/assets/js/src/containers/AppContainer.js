import React, { Component, PropTypes } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { SOCKET_SERVER } from '../shared/constants/socket';
import { updateActiveWindow } from '../redux/ducks/activeDucks';
console.log(SOCKET_SERVER);
/**
 * Components
 */
import Nav from '../components/Nav';
import Active from '../components/Active';

const socket = io(SOCKET_SERVER);

class AppContainer extends Component {
  componentWillMount() {
    document.addEventListener('visibilitychange', () => {
      this.props.updateActiveWindow(document.visibilityState);
    });

    socket.on('check_connection', () => {
      if (this.props.params) {
        const { params: { roomName, topicRef } } = this.props;
        if (roomName) {
          socket.emit('join:room', { roomName });
        }
        if (topicRef) {
          socket.emit('join:topic', { topicRef, roomName });
        }
      }
    });
  }

  render() {
    return (
      <div className="app-container">
        <Nav location={this.props.location} />
        <Active children={this.props.children} socket={socket} />
      </div>
    );
  }
}

AppContainer.propTypes = {
  children: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  isWindowActive: state.active.window,
});

const mapDispatchToProps = dispatch => ({
  updateActiveWindow: windowState => dispatch(updateActiveWindow(windowState)),
});

const ConnectedAppContainer = connect(mapStateToProps, mapDispatchToProps)(
  AppContainer,
);

export default ConnectedAppContainer;
