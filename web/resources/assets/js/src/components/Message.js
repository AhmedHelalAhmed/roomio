import React from 'react';
import { Link } from 'react-router';

const Message = ({ message, key }) => {
  return (
    <strong className="user">
      <Link to={'/user/' + message.user.username}>
        {message.user.username}:
      </Link>
    </strong>
  );
}

export default Message;
