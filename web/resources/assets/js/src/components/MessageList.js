import React, { Component } from 'react';
import { Link } from 'react-router';
import Message from './Message.js';
import showdown from 'showdown';
import FontAwesome from 'react-fontawesome';
import { Element } from 'react-scroll';

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
      <div className="outerChat">
        <div className="fortopic" id="fortopic">
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
          <Element name="anchor" className="anchor" />
        </div>
        <div className="bottomChat">
        {
          window.user ?
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
            </div> :
            <span className="topicMessenger" style={{ textAlign: 'center' }}>
              <p>
                You must be logged in to send a message.
              </p>
            </span>
        }
        </div>
      </div>
    );
  }
}

export default MessageList;
