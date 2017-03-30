import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import MessageList from './MessageList';

const Topic = (props) => (
  <div className="messenger">
  <div className ="sharedContainer">
    <div className="sharedTitleSep topicSep">
      <h1>
        <span>
          <Link 
            to={`/room/${props.topic.room_name}`}
            className="return"
          >
            {props.topic.room_name}
          </Link> - {props.topic.title}
        </span>
      </h1>
    </div>
      <MessageList {...props} />
    </div>
  </div>
);

export default Topic;