import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Home from './Home/';
import Test from './Test';
import Notes from './Notes';
import Conversations from './Conversations';
import Conversation from './Conversation';
import App from './App';

// router would go here.
const Routes = () => {
   return (
      <Router history={browserHistory}>
         <Route path="/" component={App}>
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
