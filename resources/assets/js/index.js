import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import thunk from 'redux-thunk';
import rootReducer from './app/reducers';

//  root file
import Routes from './app/Routes';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
);

console.log(store.getState());

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
if (module.hot) {
  module.hot.accept('./app/Routes', () => {
    render(Routes);
  });
}
