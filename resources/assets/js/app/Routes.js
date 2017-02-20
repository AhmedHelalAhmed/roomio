import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Home from './features/Home/';
import Test from './Test';
import Notes from './features/Notes';
import Conversations from './features/Conversations';
import Conversation from './features/Conversation';
import AppContainer from './AppContainer';

// router would go here.
const Routes = () => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={AppContainer}>
        <IndexRoute component={Home} />
        <Route path="test" component={Test} />
        <Route path="conversations" component={Conversations} />
        <Route path="conversation/:id" component={Conversation} />
        <Route path="notes" component={Notes} />
      </Route>
    </Router>
  );
};

export default Routes;
