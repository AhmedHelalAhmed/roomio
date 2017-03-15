import React, { PropTypes } from 'react';
import TopicList from './TopicList';

const Room = (props) => {
  const { room, topics } = props;
  return (
    <div className="sharedContainer">
      <div className="sharedTitleSep">
        <h1>
          <span>
            {room.title}
          </span>
        </h1>
      </div>
      <div className="sharedBody">
        <div className="roomInformation">
          <div className="description">
            <h2 className="informationHeader">Description</h2>
            <p>{room.description}</p>
          </div>
          <div className="admin">
            <h2 className="informationHeader">Admin</h2>
            <p className="adminTag">{room.user.username}</p>
          </div>
        </div>
        <h3>Topics</h3>
        <TopicList topics={topics} />
      </div>
      {/*<h1>{room.title}</h1>*/}
    </div>
  );
};

Room.propTypes = {

};

export default Room;