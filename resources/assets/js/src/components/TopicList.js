import React from 'react';
import { Link } from 'react-router';

const TopicList = ({ topics }) => (
  <div className="sharedContainer">
    {topics.map((topic, key) => {
      return (
        <div key={key} className="topic">
          <Link to={`/room/${topic.room_name}/topic/${topic.ref}`}><h4>{topic.title}</h4></Link>
          <p>{topic.description}</p>
          <p>{topic.message_count}</p>
        </div>
      );
    })}
  </div>
);

export default TopicList;