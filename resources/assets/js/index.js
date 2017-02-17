import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Routes from './components/Routes'; //root file

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(Routes);

// for hot module replacement, needs to point to the root file. (for recursive bundling)
if (module.hot) {
    module.hot.accept('./components/Routes', () => {
      render(Routes)
  });
}
