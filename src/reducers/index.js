import { combineReducers } from 'redux';
import auth from './auth';
import info from './info';
import translate from './translate';

const rootReducer = combineReducers({
  auth,
  info,
  translate,
});

export default rootReducer;
