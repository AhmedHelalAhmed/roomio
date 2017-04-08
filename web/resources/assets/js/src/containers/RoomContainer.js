import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { addRoom, addTopics } from '../redux/ducks/entitiesDucks';
import { updateActiveRoom } from '../redux/ducks/activeDucks';
import { updateRoomPagination } from '../redux/ducks/paginationDucks';
import {
  startLoadingRoom,
  stopLoadingRoom,
} from '../redux/ducks/isLoadedDucks';
import { authGET } from '../shared/utils/authAxios';
import Room from '../components/Room';
import Loading from '../components/reusable/Loading';

class RoomContainer extends Component {
  state = {
    modalIsOpen: false,
    newTopicIsOpen: false,
  };

  componentWillReceiveProps(nextProps) {
    const newRoomName = nextProps.params.roomName;
    const currentRoomName = this.props.params.roomName;
    if (newRoomName && newRoomName !== currentRoomName) {
      const { socket } = nextProps;
      socket.emit('leave_room', { roomName: currentRoomName });
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
      this.props.updateRoomPagination(roomName, {
        page: 1,
        loading: false,
        end: false,
      });
      console.log(this.props.pagination);
    }

    this.props
      .fetchRoom(roomName)
      .then(() => {
        socket.emit('join_room', { roomName });
      })
      .catch(err => {
        console.log(err.response);
        // this.setState({ error: err.response.data.error });
      });
  }

  loadMore = () => {
    const { page, end } = this.props.pagination;
    const { roomName } = this.props.params;
    this.props.updateRoomPagination(roomName, { loading: true });
    if (!end) {
      this.props.fetchRoomTopics(roomName, page).then(res => {
        console.log(`fetched page ${page}`);
        console.log(res);
        this.props.updateRoomPagination(roomName, {
          page: page + 1,
          loading: false,
          end: res.data.topics.data.length === 0,
        });
      });
    }
  };

  onClickModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  onClickNewTopic = () => {
    //window.location = this.props.params.roomName;
    this.setState({ newTopicIsOpen: true });
  };

  closeTopicScreen = () => {
    this.setState({ newTopicIsOpen: false });
  };

  componentWillUnmount() {
    const { socket, params: { roomName } } = this.props;
    socket.emit('leave_room', { roomName });
  }

  render() {
    const { rooms, topics, isLoaded } = this.props;
    const { roomName } = this.props.params;

    if (isLoaded && !rooms[roomName]) {
      return (
        <div className="room404 none">
          <div className="noneinner">
            {roomName} is not a room yet.
          </div>
          <div className="noneinner createNewTopic">
            <Link to={`/newroom?roomName=${roomName}`}>Create it!</Link>
          </div>
        </div>
      );
    }

    if (isLoaded) {
      return (
        <Room
          closeTopicScreen={this.closeTopicScreen}
          onClickNewTopic={this.onClickNewTopic}
          onClick={this.onClickModal}
          closeModal={this.closeModal}
          localstate={this.state}
          room={rooms[roomName]}
          topics={topics[roomName]}
          loadMore={this.loadMore}
          {...this.props.pagination}
        />
      );
    }

    return <Loading name="room" />;
  }
}

const mapStateToProps = (state, props) => ({
  rooms: state.entities.rooms,
  topics: state.entities.topics,
  active: state.active,
  isLoaded: state.isLoaded.rooms[props.params.roomName],
  pagination: state.pagination.rooms[props.params.roomName],
});

const mapDispatchToProps = dispatch => ({
  startLoading: roomName => dispatch(startLoadingRoom(roomName)),
  updateRoomPagination: (roomName, pagination) =>
    dispatch(updateRoomPagination(roomName, pagination)),
  fetchRoom: roomName => {
    return new Promise((resolve, reject) => {
      authGET(`/api/room/${roomName}?with=topics`)
        .then(res => {
          const { room, topics } = res.data;
          dispatch(addRoom(room));
          dispatch(addTopics(room.name, topics.data));
          dispatch(updateActiveRoom(room.name));
          dispatch(stopLoadingRoom(roomName));
          document.title = room.title;
          resolve(res);
        })
        .catch(err => {
          dispatch(stopLoadingRoom(roomName));
          reject(err);
        });
    });
  },
  fetchRoomTopics: (roomName, page) => {
    return new Promise((resolve, reject) => {
      const endpoint = `/api/topic/room/${roomName}?page=${page}`;
      authGET(endpoint)
        .then(res => {
          const { topics } = res.data;
          dispatch(addTopics(roomName, topics.data));
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
});

const ConnectedRoomContainer = connect(mapStateToProps, mapDispatchToProps)(
  RoomContainer,
);

export default ConnectedRoomContainer;
