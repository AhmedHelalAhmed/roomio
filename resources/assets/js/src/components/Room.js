import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Room = (props) => {
  const { room, topics } = props;
  return (
    <div className="roomContainer">
      <div className="roomTitleSep">
        <h1>
          <span>
            {room.title}
          </span>
        </h1>
      </div>
      <div className="roomBody">
      <div className="roomInformation">
        <div className="description">
          <h2 className="informationHeader">Room Description</h2>
          <p>{room.description}</p>
        </div>
        <div className="admin">
          <h2 className="informationHeader">Room Admin</h2>
          <p className="adminTag">{room.user.username}</p>
        </div>
      </div>
        <h3>Topics</h3>
        <div className="topicContainer">
          {topics.map((topic, key) => {
            return (
              <div key={key} className="topic">
                <Link to={`/room/${room.name}/topic/${topic.ref}`}><h4>{topic.title}</h4></Link>
                <p>{topic.description}</p>
              </div>
            )
          })}
        </div>
      </div>
      {/*<h1>{room.title}</h1>*/}
    </div>
  );
};

Room.propTypes = {

};

export default Room;