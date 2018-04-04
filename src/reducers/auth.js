import isFunction from 'lodash/isFunction';
import flowRight from 'lodash/flowRight';
import api from '../api';
import { showError } from '../helpers/uiHelper';
import cookieHelper from '../helpers/cookieHelper';

export const LOAD = 'redux-ducks/auth/LOAD';
export const LOAD_SUCCESS = 'redux-ducks/auth/LOAD_SUCCESS';
export const LOAD_FAIL = 'redux-ducks/auth/LOAD_FAIL';

export const LOGIN_SUCESS = 'redux-ducks/auth/LOGIN_SUCCESS';

export const SET_STATUS_PAGE = 'redux-ducks/auth/SET_STATUS_PAGE';
export const SET_DEFAULT = 'redux-ducks/auth/SET_DEFAULT';

const initialState = {
  loading: false,
  loaded: false,
  error: null,
  current: {
    type: 'guest',
  },
};

export function isLoaded(globalState) {
  return globalState.info && globalState.info.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client => client.get('/loadInfo')
  };
}

export function setDefault() {
  return {
    type: SET_DEFAULT
  };
}

function login(payload) {
  console.log('**********', payload);
  return {
    type: LOGIN_SUCESS,
    data: payload,
  }
}

// ACTIONS
export const loginAction = payload => async (dispatch) => {
  try {
    const data = await api.auth.login('auth/login', payload);
    await dispatch(login(data));
    console.log('*Data*', data);
    return data;
  } catch (error) {
    const { status, statusText } = error;

    if (!status) {
      showError('Somethin went wrong. Try later');
    }

    if (status === 500) {
      showError(statusText);
    }

    throw error;
  }
};

export const signupAction = payload => async (dispatch) => {
  try {
    const data = await api.auth.signup('auth/register', payload);
    dispatch(login());
    console.log('*Data*', data);
    return data;
  } catch (error) {
    const { data, status, statusText } = error;

    if (!data || !data.errors) {
      showError('Somethin went wrong. Try later');
    }

    if (status === 500) {
      showError(statusText);
    }

    throw error;
  }
};

export const loadAuth = () => {
  return (dispatch) => {
    if (cookieHelper.get('token')) {
      return dispatch(load());
    }

    dispatch(setDefault());
    return Promise.resolve();
  };
}


const updateRequestOnLoad = value => state => ({
  ...state,
  loading: value
});

const updateRequestOnLoadSuccess = value => state => ({
  ...state,
  loading: value,
  loaded: true,
  error: null
});

const update = action => state => ({
  ...state,
  current: action.result,
});

const updateRequestOnLoadFail = (action, value) => state => ({
  ...state,
  loading: value,
  loaded: value,
  current: {
    type: 'guest',
  },
  error: action.error
});

const loginRequestSuccess = action => (state) => {
  console.log('[1] Action', action);
  console.log('[2] State', state);
  cookieHelper.save('token', action.data.token);

  return {
    ...state,
    
  }
}

const setDefaultSuccess = () => initialState;

const actionsLookup = {
  [LOGIN_SUCESS]: (state, action) => loginRequestSuccess(action)(state),
  [LOAD]: state => updateRequestOnLoad(true)(state),
  [LOAD_SUCCESS]: (state, action) => flowRight(
    updateRequestOnLoadSuccess(false),
    update(action),
  )(state),
  [LOAD_FAIL]: (state, action) => updateRequestOnLoadFail(action, false)(state),

  [SET_DEFAULT]: () => setDefaultSuccess(),
};

export default function reducer(state = initialState, action) {
  if (isFunction(actionsLookup[action.type])) return actionsLookup[action.type](state, action);

  return state;
}