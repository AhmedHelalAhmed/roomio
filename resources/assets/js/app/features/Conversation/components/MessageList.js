import React, { PropTypes } from 'react';
import Message from './Message';

const MessageList = (props) => {
  return (
    <div className={props.className}>
      <ul>
        {props.messages.map((message, key) => {
          return <Message message={message} key={key} />;
        })}
      </ul>
    </div>
  );
};

MessageList.propTypes = {
  className: PropTypes.string.isRequired,
  messages: PropTypes.array.isRequired,
};

export default MessageList;
