import React from 'react';
import TopicList from './TopicList';

const Home = props => (
  <div>
    <div className="sharedContainer limit">
      <div className="sharedTitleSep">
        <h1>
          <span className='frontPage'>
            Front Page
          </span>
        </h1>
      </div>
      <div className="sharedBody fixedBody">
        <TopicList {...props} />
      </div>
    </div>
  </div>
);

export default Home;