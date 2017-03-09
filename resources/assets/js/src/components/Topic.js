import React, { PropTypes } from 'react';

const Topic = (props) => {
  const { topic, messages } = props;
    return (
        <div className ="sharedContainer">
          <div className="sharedTitleSep">
            <h1>
              <span>
                {topic.room_name}
                  <span className="topicTitle" >
                    {topic.title}
                  </span>
              </span>
            </h1>
          </div>
          <div className="topicInformationCont">
            <div className="topicInformation">
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
                <input 
                  type="text" 
                  onChange={props.onChange} 
                  value={props.content} 
                  autofocus
                />
                <button type="submit">Send</button>
              </form> : null
          }
          </span>
        </div>
    );
};

Topic.propTypes = {

};

export default Topic;