import React, { Component } from 'react';
import { Link } from 'react-router';
import Message from './Message.js';
import showdown from 'showdown';

class MessageList extends Component {

  componentWillMount() {
    this.converter = new showdown.Converter({
      simplifiedAutoLink: true,
      excludeTrailingPunctuationFromURLs: true,
      omitExtraWLInCodeBlocks: true,
      strikethrough: true,
    });
  }

  render() {
    const { topic, messages, sendMessage, onChange, content } = this.props;

    return (
      <div>
        <div className="fortopic">
          {messages ?
            messages.map((message, key) => {
              const isFirst = key === 0;
              const html = this.converter.makeHtml(message.content);

              return (
                <p className="chatBubble" key={key}>
                  {   isFirst || messages[key - 1].user.username !== message.user.username ?
                      <Message message={message} ky={key} /> : null
                  }
                  <span
                    style={{ whiteSpace: 'pre-wrap' }}
                    dangerouslySetInnerHTML={{ __html: html }}
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

export default MessageList;
