import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Room = (props) => {
  const { room, topics } = props;
  return (
    <div>
      <h1>{room.title}</h1>
      <h2>Room Description</h2>
      <p>{room.description}</p>
      <h3>Room Admin: {room.user.username}</h3>
      <h3>Topics</h3>
      {topics.map((topic, key) => {
        return (
          <div key={key}>
            <Link to={`/room/${room.name}/topic/${topic.ref}`}><h4>{topic.title}</h4></Link>
            <p>{topic.description}</p>
          </div>
        )
      })}
      {/*<h1>{room.title}</h1>*/}
    </div>
  );
};

Room.propTypes = {

};

export default Room;