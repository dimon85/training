import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import info from './info';
import translate from './translate';

const rootReducer = combineReducers({
  router: routerReducer,
  auth,
  info,
  translate,
});

export default rootReducer;

