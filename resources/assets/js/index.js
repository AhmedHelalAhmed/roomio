import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
//  root file
import Routes from './app/Routes';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
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
