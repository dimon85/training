import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './components/App';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const rootEl = document.getElementById('root');

const render = () =>
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    rootEl
  );


if (module.hot) {
  const renderApp = render;

  module.hot.accept('./components/App', () => {
    renderApp();
  });
}
render();