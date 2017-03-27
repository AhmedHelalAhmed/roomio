import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Chat from './Chat';

const Topic = (props) => (
  <div className="messenger">
  <div className ="sharedContainer">
    <div className="sharedTitleSep">
    </div>
    <div className="topicInformationCont">
      <div className="topicInformation">
        <span className="topicTitle" >
          <h3>Title</h3>
          <p>{props.topic.room_name}/{props.topic.title}</p>
          </span>
        <h3>Description</h3>
        <p>{props.topic.description}</p>
        <h4>Room</h4>
        <Link to={`/room/${props.topic.room_name}`}>{props.topic.room_name}</Link>
      </div>
    </div>
      <Chat {...props} />
    </div>
  </div>
);

export default Topic;