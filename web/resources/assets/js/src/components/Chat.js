import React, { Component } from 'react';
import { Link } from 'react-router';
// import 'draft-js/dist/Draft.css';
import { Editor, RichUtils } from 'draft-js';

class Chat extends Component {
  render() {
    const { topic, messages, sendMessage, onChange, content } = this.props;

    return (
      <div>
        <div className="fortopic">
          {messages ?
            messages.map((message, key) => {
              return (
                <p className="chatBubble" key={key}>
                <strong className="user">
                  <Link to={'/user/' + message.user.username}>
                    {message.user.username}:
                  </Link>
                </strong>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: message.content
                    }}
                  />
                </p>
              );
            }) : null
          }
        </div>
        {
          window.user ?
            <div>
              <span className="topicMessenger">
                <form onSubmit={sendMessage}>
                  <textarea
                    cols="40"
                    rows="5"
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
                  <button type="submit">Send</button>
                </form>
              </span>
            </div> :
            <span className="topicMessenger" style={{ textAlign: 'center' }}>
              <p>
                You must be logged in to send a message.
              </p>
            </span>
        }
      </div>
    );
  }
}

export default Chat;