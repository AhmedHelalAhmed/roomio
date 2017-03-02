import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  addRoom,
  addTopic,
} from '../redux/ducks/entitiesDucks';
import io from 'socket.io-client';
import {
  SOCKET_SERVER,
  NEW_MESSAGE,
  JOIN_ROOM,
  LEAVE_ROOM,
  SEND_MESSAGE,
} from '../shared/constants/socket';

const socket = io(SOCKET_SERVER);
// socket.emit(JOIN_ROOM, { conversationId: this.props.params.id });
// socket.on(NEW_MESSAGE, ({ message, name }) => {
//   this.props.addMessage({ ...message, user: { name } });
// });

class AppContainer extends Component {
  render() {
    return (
      <div>
        {
          React.Children.map(this.props.children, child =>
            React.cloneElement(child, { socket }),
          )
        }
      </div>
    );
  }
}

AppContainer.propTypes = {
  children: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  entities: state.entities,
});

// const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

function mapDispatchToProps(dispatch) {
  return {
    addRoom: (value) => dispatch(addRoom(value)),
    addTopic: () => dispatch(addTopic())
  };
}

const ConnectedAppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);

export default ConnectedAppContainer;
