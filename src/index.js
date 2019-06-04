import React from 'react';
import { render } from 'react-dom';
import { createBrowserHistory } from 'history';
import configureStore from './store/configureStore';
import RootContainer from './containers/RootContainer';
import '../assets/styles/styles.scss';
import '../assets/images/favicon.ico';

//
// Register serverWorkers on stg and live
// -----------------------------------------------------------------------------
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}

const rootEl = document.getElementById('root');
const history = createBrowserHistory({ basename: '/' });
const store = configureStore(history);

render(<RootContainer store={store} history={history} />, rootEl);
