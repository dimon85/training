import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const rootEl = document.getElementById('root');

const render = () => {
  const key = module.hot ? Math.random() : undefined;
  console.log('hot render1', key);
  ReactDOM.render(
    <App key={key} />,
    rootEl
  );
};

if (module.hot) {
  const renderApp = render;

  module.hot.accept('./components/App', () => {
    renderApp();
  });
}

render();
