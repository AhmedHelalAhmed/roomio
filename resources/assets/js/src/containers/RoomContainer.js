import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addRoom, addTopics } from '../redux/ducks/entitiesDucks';
import { updateActiveRoom } from '../redux/ducks/activeDucks';
import { startLoadingRoom, stopLoadingRoom } from '../redux/ducks/loadingDucks';
import { authGET } from '../shared/utils/authAxios';

import Room from '../components/Room';

class RoomContainer extends Component {

  componentWillReceiveProps(nextProps) {
    const newRoomName = nextProps.params.roomName;
    const currentRoomName = this.props.params.roomName;

    if (newRoomName && newRoomName !== currentRoomName) {
      const { socket } = nextProps;
      socket.emit('leave_room', { currentRoomName });
      this.checkCacheAndFetch(newRoomName);
    }
  }

  componentWillMount() {
    const { roomName } = this.props.params;
    this.checkCacheAndFetch(roomName);
  }

  checkCacheAndFetch(roomName) {
    const { rooms, socket } = this.props;
    // check cache
    if (!rooms[roomName]) {
      //  show spinner if nothing is in cache
      this.props.startLoading();
    }

    this.props.fetchRoom(roomName)
      .then(() => {
        socket.emit('join_room', { roomName });
      }).catch((err) => console.log(err));
  }

  componentWillUnmount() {
    const { socket, params: { roomName } } = this.props;
    socket.emit('leave_room', { roomName });
  }

  render() {
    const { rooms, topics, isLoaded } = this.props;
    const { roomName } = this.props.params;

    if (isLoaded || rooms[roomName]) {
      return (
        <Room
          room={rooms[roomName]}
          topics={topics[roomName]}
        />
      );
    }

    return (
      <p>spinner</p>
    );
  }
}

const mapStateToProps = (state, props) => ({
  rooms: state.entities.rooms,
  topics: state.entities.topics,
  active: state.active,
  isLoaded: state.isLoaded.rooms[props.params.roomName],
});

const mapDispatchToProps = dispatch => ({
  startLoading: (roomName) => dispatch(startLoadingRoom(roomName)),
  fetchRoom: (roomName, onSuccess) => {
    return new Promise((resolve, reject) => {
      authGET(`/api/room/${roomName}?with=topics`)
        .then((res) => {
          const { room, topics } = res.data;
          dispatch(addRoom(room));
          dispatch(addTopics(room.name, topics.data));
          dispatch(updateActiveRoom(room.name));
          dispatch(stopLoadingRoom(roomName));
          document.title = room.title;
          resolve();
        })
        .catch((err) => {
          dispatch(stopLoadingRoom(roomName));
          reject(err);
        });
    })
  },
});

const ConnectedRoomContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomContainer);

export default ConnectedRoomContainer;