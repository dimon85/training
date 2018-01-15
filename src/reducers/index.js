import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import info from './info';

const rootReducer = combineReducers({
  router: routerReducer,
  auth,
  info,
});

export default rootReducer;

