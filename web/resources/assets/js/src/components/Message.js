import React from 'react';
import { Link } from 'react-router';

const Message = ({ messages, message, index, html }) => {
  const isFirst = index === 0;

  return (
    <p className="chatBubble" key={index}>
      {   isFirst || messages[index - 1].user.username !== message.user.username ?
          <strong className="user">
            <Link to={'/user/' + message.user.username}>
              {message.user.username}:
            </Link>
          </strong> : null
      }
      <span
        style={{ whiteSpace: 'pre-wrap' }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </p>
  );
};

export default Message;
