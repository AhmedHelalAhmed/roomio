import React, { PropTypes } from 'react';
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
      </div>
    </div>
      <Chat {...props} />
    </div>
  </div>
);

export default Topic;