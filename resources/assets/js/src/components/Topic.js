import React, { PropTypes } from 'react';

const Topic = (props) => {
  const { topic } = props;
    return (
        <div>
          <h2>Title</h2>
          <h4>{topic.title}</h4>
          <h3>Description</h3>
          <p>{topic.description}</p>
          <h4>Messages:</h4>
        </div>
    );
};

Topic.propTypes = {

};

export default Topic;