import React, { PropTypes } from 'react';

const Topic = ({ topic, messages }) => (
  <div className ="sharedContainer">
    <div className="sharedTitleSep">
    </div>
    <div className="topicInformationCont">
      <div className="topicInformation">
        <span className="topicTitle" >
          <h3>Title</h3>
          <p>{topic.room_name}/{topic.title}</p>
          </span>
        <h3>Description</h3>
        <p>{topic.description}</p>
      </div>
    </div>
    <div className="sharedBody">
      {messages ?
        messages.map((message, key) => {
          return (
            <p className="chatBubble" key={key}>
            <strong className="user">
              {message.user.username}:
            </strong> {message.content}</p>
          );
        }) : null
      }
    </div>
    <span className="topicMessenger">
      {
      window.user ?
        <form onSubmit={props.sendMessage}>
          <textarea 
            cols="40" 
            rows="5"
            type="text" 
            onChange={props.onChange} 
            value={props.content} 
            autofocus
          />
          <button type="submit">Send</button>
        </form> : <div><p>
          Must be logged in to converse
        </p></div>
    }
    </span>
  </div>
);

export default Topic;