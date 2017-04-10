import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import AppContainer from './containers/AppContainer';
import RoomContainer from './containers/RoomContainer';
import HomeContainer from './containers/HomeContainer';
import TopicsContainer from './containers/TopicsContainer';
import Login from './components/Login';
import Register from './components/Register';
import CreateRoom from './components/CreateRoom';
import CreateTopic from './components/CreateTopic';
import AuthContainer from './containers/AuthContainer';
import ProfileContainer from './containers/ProfileContainer';

const requireAuth = (nextState, replace, callback) => {
  if (!window.user) {
    browserHistory.push('/login');
  } else {
    callback();
  }
};

// router would go here.
const Routes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer}>
      <IndexRoute component={HomeContainer} />
      <Route path="/newroom" component={CreateRoom} onEnter={requireAuth} />
      <Route path="/newtopic" component={CreateTopic} onEnter={requireAuth} />
      <Route path="/room/:roomName" component={RoomContainer} />
      <Route
        path="/room/:roomName/topic/:topicRef"
        component={TopicsContainer}
      />
      <Route path="/user/:userName" component={ProfileContainer} />
    </Route>
    <Route
      path="/login"
      component={() => (
        <AuthContainer>
          <Login />
        </AuthContainer>
        )}
    />
    <Route
      path="/register"
      component={() => (
        <AuthContainer>
          <Register />
        </AuthContainer>
        )}
    />
  </Router>
  );

export default Routes;
