import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Home from './Home/';
import Test from './Test';
import Notes from './Notes';
import SocketTest from './Socket_Test';
import App from './App';

// router would go here.
const Routes = () => {
   return (
      <Router history={browserHistory}>
         <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="test" component={Test} />
            <Route path="notes" component={Notes} />
            <Route path="socket" component={SocketTest} />
         </Route>
      </Router>
   );
};

export default Routes;
