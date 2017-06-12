import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import createHistory from 'history/createBrowserHistory';
import { AppContainer } from 'react-hot-loader';
import configureStore from './store/configureStore';
import RootContainer from './containers/RootContainer';
import '../assets/styles/styles.scss';

injectTapEventPlugin();

const rootEl = document.getElementById('root');
const history = createHistory();
const store = configureStore(history);

const render = (Component) => {
  ReactDOM.render(
    <AppContainer errorReporter={({ error }) => { throw error; }}>
      <Component
        store={store}
        history={history}
      />
    </AppContainer>,
    rootEl
  );
};

render(RootContainer);

if (module.hot) {
  module.hot.accept('./containers/RootContainer', () => {
    const Root = RootContainer.default;
    render(Root);
  });
}
