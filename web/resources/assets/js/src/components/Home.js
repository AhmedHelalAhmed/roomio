import React from 'react';
import TopicList from './TopicList';

const Home = ({ topics }) => (
  <div>
    <div className="sharedContainer">
      <div className="sharedTitleSep">
        <h1>
          <span>
            Front Page
          </span>
        </h1>
      </div>
      <div className="sharedBody">
        <TopicList topics={topics} />
      </div>
    </div>
  </div>
);

export default Home;