import React from 'react';
import TopicList from './TopicList';

const Home = ({ topics }) => (
  <div>
    <div className="sharedContainer">
      <div className="sharedBody">
        <h1>Front page</h1>
        <TopicList topics={topics} />
      </div>
    </div>
  </div>
);

export default Home;