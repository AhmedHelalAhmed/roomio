import React, { PropTypes } from 'react';
import TopicList from './TopicList';
import { Link } from 'react-router';

const Room = ({ room, topics }) => (
  <div className="sharedContainer">
    <div className="sharedTitleSep">
      <h1>
        <span>
          {room.title}
        </span>
      </h1>
    </div>
    <div className="sharedBody sidebyside">
      <div className="topicsFlex">
        <h3>Topics</h3>
        <TopicList topics={topics} name={room.name} />
      </div>
      <div className="roomInformation">
        <div className="fixed">
          <br />
          <span className="newTopic">
            <Link to={`/newtopic?room=${room.name}`}>
              + New Topic
            </Link>
          </span>
          <div className="description">
            <br className="break" />
            <hr className="topicSeperator" />
            <h2 className="informationHeader">Description</h2>
            <p>{room.description}</p>
          </div>
          <div className="admin">
            <h2 className="informationHeader">Admin</h2>
            <p className="adminTag">
              <Link to={'/user/' + room.user.username}>
                {room.user.username}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Room;
