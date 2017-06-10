import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import injectTapEventPlugin from 'react-tap-event-plugin';
import { AppContainer } from 'react-hot-loader';
import createHistory from 'history/createBrowserHistory';
import configureStore from './store/configureStore';

injectTapEventPlugin();

const rootEl = document.getElementById('root');
const history = createHistory();
const store = configureStore(history);

const render = () => {
  const getRoutes = require('./routes').default;
  const routes = getRoutes(store);

  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          {routes}
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    rootEl
  );
};

if (module.hot) {
  module.hot.accept('./routes', () => {
    render();
  });
}

render();
