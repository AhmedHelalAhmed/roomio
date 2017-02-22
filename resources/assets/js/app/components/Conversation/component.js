import React, { PropTypes } from 'react';
import styles from './styles.css';
import MessageList from '../MessageList';

const Conversation = (props) => {
  const { conversation, sendMessage, updateMessageField } = props;
  return (
    <div className={styles.socket_test}>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          name="message"
          value={conversation.message}
          onChange={(e) => {
            updateMessageField(e.target.value);
          }}
        />
        <button type="submit">
            Send
        </button>
      </form>
      <MessageList
        messages={conversation.messages}
        className={styles.chat}
      />
    </div>
  );
};

Conversation.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  conversation: PropTypes.object.isRequired,
  updateMessageField: PropTypes.func.isRequired,
};

export default Conversation;
