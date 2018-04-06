import React from 'react';
import { render } from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin';
import createHistory from 'history/createBrowserHistory';
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

injectTapEventPlugin();

const rootEl = document.getElementById('root');
const history = createHistory({ basename: '/' });
const store = configureStore(history);

render(<RootContainer store={store} history={history} />, rootEl);
