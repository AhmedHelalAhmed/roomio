import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import AppContainer from './containers/AppContainer';
import RoomContainer from './containers/RoomContainer';
import TopicContainer from './containers/TopicContainer';
import Login from './components/Login';

// router would go here.
const Routes = () => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={AppContainer}>
        <Route path="/signin" component={Login} />
        <Route path="/room/:roomName" component={RoomContainer} />
        <Route path="/room/:roomName/topic/:topicRef" component={TopicContainer} />
      </Route>
    </Router>
  );
};

export default Routes;
