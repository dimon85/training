import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux'
import App from './components/App';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const reduxState = {};
const rootEl = document.getElementById('root');
let store = configureStore(reduxState);

const render = () => {
  const key = module.hot ? Math.random() : undefined;
  console.log('hot render1', key);
  ReactDOM.render(
    <Provider store={store}>
      <div> { /* your usual react-router v4 routing */ }
        <Switch>
          <Route exact path="/" render={App} />
          <Route render={() => (<div>Miss</div>)} />
        </Switch>
      </div>
    </Provider>,
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
