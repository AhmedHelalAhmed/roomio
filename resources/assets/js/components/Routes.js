import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Home from './Home/';
import Test from './Test';
import App from './App';

// router would go here.
const Routes = () => {
   return (
      <Router history={browserHistory}>
         <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="test" component={Test} />
         </Route>
      </Router>
   );
};

export default Routes;
