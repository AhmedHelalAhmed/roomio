import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import thunk from 'redux-thunk';

import reducers from './src/redux/reducers';

// load in the styles
require('../sass/app.scss');

import Routes from './src/Routes';

const logger = store => next => action => {
  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  return result
};

const store = createStore(
  reducers,
  applyMiddleware(thunk),
);

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(Routes);

// for hot module replacement, needs to point to the root file. (for recursive bundling)
if (process.env.NODE_ENV === 'dev') {
  if (module.hot) {
    module.hot.accept('./src/Routes', () => {
      render(Routes);
    });
  }
}
