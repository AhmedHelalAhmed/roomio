import React, { PropTypes } from 'react';

const Topic = (props) => {
  const { topic, messages } = props;
    return (
        <div>
          <h2>Title</h2>
          <h4>{topic.title}</h4>
          <h3>Description</h3>
          <p>{topic.description}</p>
          <form onSubmit={props.sendMessage}>
            <input type="text" onChange={props.onChange} value={props.content} />
            <button type="submit">Send</button>
          </form>
          {messages ?
            messages.map((message, key) => {
              return (
                <p key={key}><strong>{message.user.username}:</strong> {message.content}</p>
              );
            }) : null
          }
        </div>
    );
};

Topic.propTypes = {

};

export default Topic;