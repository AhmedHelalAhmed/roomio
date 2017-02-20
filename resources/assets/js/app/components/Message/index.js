import React, { PropTypes } from 'react';

const Message = (props) => {
  const { message } = props;
  const name = message.user.name === window.user.name ? 'you' : message.user.name;
  const { content } = message;
  return (
    <li>
      {name}: {content}
    </li>
  );
};

Message.propTypes = {
  message: PropTypes.object.isRequired,
};

export default Message;
