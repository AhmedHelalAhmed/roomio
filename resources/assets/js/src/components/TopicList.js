import React from 'react';
import { Link } from 'react-router';


const TopicItem = ({ topic }) => (
  <div className="topic">
    <Link to={`/room/${topic.room_name}/topic/${topic.ref}`}><h4>{topic.title}</h4></Link>
    <span>
      <Link to={'/user/' + topic.user.username}>
        {topic.user.username}
      </Link>
    </span>
    <p>{topic.description}</p>
    <p>{topic.messages_count} messages</p>
  </div>
);


const TopicList = ({ topics }) => (
  <div className="sharedContainer">
    {topics.map((topic, key) =>
      <TopicItem topic={topic} key={key} />
    )}
  </div>
);

export default TopicList;