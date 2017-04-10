import React, { Component } from 'react';
import showdown from 'showdown';
import { Element } from 'react-scroll';
import Infinite from 'react-infinite';

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

  render() {
    const { topic, messages, sendMessage, onChange, content } = this.props;

    return (
      <div className="outerChat">
        <div className="fortopic" id="fortopic">
          {messages
            ? messages.map((message, key) => (
              <Message
                messages={messages}
                message={message}
                html={this.converter.makeHtml(message.content)}
                key={key}
                index={key}
              />
              ))
            : null}
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
