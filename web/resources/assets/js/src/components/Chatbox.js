import React from 'react';
import FontAwesome from 'react-fontawesome';

const Chatbox = ({ sendMessage, onChange, content }) => {
  if (!window.user) {
    return (
      <span className="topicMessenger" style={{ textAlign: 'center' }}>
        <p>
          You must be logged in to send a message.
        </p>
      </span>
    );
  }

  return (
    <div className="topicOuterMessenger">
      <span className="topicMessenger">
        <form onSubmit={sendMessage}>
          <textarea
            placeholder="Write your message"
            type="text"
            onChange={onChange}
            value={content}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (content) sendMessage();
              }
            }}
            autoFocus
          />
          <button type="submit">
            <FontAwesome name="paper-plane-o" />
          </button>
        </form>
      </span>
    </div>
  );
};

export default Chatbox;
