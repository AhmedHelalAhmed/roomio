import React, { PropTypes } from 'react';
import TopicList from './TopicList';

const Room = ({ room, topics }) => (
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
  </div>
);

export default Room;