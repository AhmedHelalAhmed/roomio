import React from 'react';
import { Link } from 'react-router';


const TopicItem = ({ topic }) => {
  return (
      <div className="topic">
        <Link to={`/room/${topic.room_name}/topic/${topic.ref}`}><h2>{topic.title}</h2></Link>
        <p><Link to={`/room/${topic.room_name}`}>{topic.room_name}</Link> - {topic.description}</p>
        <div className="commentsAndUser">
          <Link to={`/room/${topic.room_name}/topic/${topic.ref}`}>
          {
            topic.messages_count != 1 ?
            <p>{topic.messages_count} messages</p> : 
            <p>{topic.messages_count} message</p>
          }
          </Link>
          <span>
            <span className="subBy">Submitted by </span><Link to={'/user/' + (topic.user ? topic.user.username : '')}>
              {topic.user ? topic.user.username : ''}
            </Link>
          </span>
        </div>
        
      </div>
  );
}


const TopicList = ({ topics, name }) => (
  <div className="sharedContainer">
    {topics.length >0 ? topics.map((topic, key) =>
      <TopicItem topic={topic} key={key} />
    ) : 
    <div className="none">
      <div className="noneinner">There are no Topics in this room</div>
      <div className="noneinner createNewTopic"><Link to={`/newtopic?room=${name}`}>create one</Link></div>
    </div>}
  </div>
);

export default TopicList;