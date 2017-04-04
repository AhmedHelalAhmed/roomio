import React, { Component } from 'react';
import showdown from 'showdown';
import { Element } from 'react-scroll';
import Waypoint from 'react-waypoint';

import Message from './Message';
import ChatBox from './Chatbox';

class MessageList extends Component {

  componentWillMount() {
    this.converter = new showdown.Converter({
      simplifiedAutoLink: true,
      excludeTrailingPunctuationFromURLs: true,
      omitExtraWLInCodeBlocks: true,
      strikethrough: true,
      openLinksInNewWindow: true,
      ghCodeBlocks: true,
    });
  }

  renderScollElement = ({ index, page, message, length }) => {
    // console.log(message.content);
    // console.log(page);
    return (
      <div>
        <Element name={`message-${(message.id)}`} />
      </div>
    )
  }

  render() {
    const {
      topic,
      messages = [],
      sendMessage,
      onChange,
      content,
      loadMore,
      loading,
      end,
      page,
    } = this.props;

    const cursors = {};

    return (
      <div className="outerChat">
        <div className="fortopic" id="fortopic">
          <div style={{ height: '20px' }}>
            <Waypoint
              onEnter={() => {
                loadMore([...messages].shift())
              }}
            />
            {loading ? 'loading' : null}
            {end ? <p style={{ textAlign: 'center' }}>
              {messages.length ? 'fin.': 'No messages yet.'}
            </p> : null}
          </div>
          {messages ?
            messages.map((message, index) => {
              return (
                <div key={index}>
                  <Message
                    messages={messages}
                    message={message}
                    html={this.converter.makeHtml(message.content)}
                    index={index}
                  />
                  <Element name={`message-${(message.id)}`} />
                </div>
              );
            }) : null
          }
          <Element name="anchor" className="anchor" />
        </div>
        <div className="bottomChat">
          <ChatBox
            sendMessage={sendMessage}
            onChange={onChange}
            content={content}
          />
        </div>
      </div>
    );
  }
}

export default MessageList;
