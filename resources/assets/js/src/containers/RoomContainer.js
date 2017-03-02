import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addRoom, addTopics } from '../redux/ducks/entitiesDucks';
import { updateActiveRoom } from '../redux/ducks/activeDucks';
import { startLoading, stopLoading } from '../redux/ducks/loadingDucks';
import { authGET } from '../shared/utils/authAxios';

import Room from '../components/Room';

class RoomContainer extends Component {

  componentWillReceiveProps(nextProps) {
    const { roomName } = nextProps;
    const { active } = this.props;
    if (roomName && roomName !== active.room) {
      this.props.fetchRoom(roomName);
    }
  }

  componentWillMount() {
    const { roomName } = this.props.params;
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
    const { roomName } = this.props.params;
    const { socket } = this.props;
    socket.emit('leave_room', { roomName });
  }

  render() {
    const { rooms, topics, active, loading } = this.props;
    const { roomName } = this.props.params;

    if (loading && !rooms[roomName]) {
      return (
        <p>spinner</p>
      );
    }

    return (
        <Room
          room={rooms[roomName]}
          topics={topics[roomName]}
        />
    );
  }
}

const mapStateToProps = state => ({
  rooms: state.entities.rooms,
  topics: state.entities.topics,
  active: state.active,
  loading: state.loading.room,
});

const mapDispatchToProps = dispatch => ({
  startLoading: (roomName) => dispatch(startLoading('room')),
  fetchRoom: (roomName, onSuccess) => {
    return new Promise((resolve, reject) => {
      dispatch(startLoading('room'));
      authGET(`/api/room/${roomName}?with=topics`)
        .then((res) => {
          const { room, topics } = res.data;
          dispatch(addRoom(room));
          dispatch(addTopics(room.name, topics.data));
          dispatch(updateActiveRoom(room.name));
          document.title = room.title;
          dispatch(stopLoading('room'));
          resolve();
        })
        .catch((err) => {
          dispatch(stopLoading('room'));
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