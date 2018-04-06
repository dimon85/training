import isFunction from 'lodash/isFunction';
import api from '../api';
import { showError } from '../helpers/uiHelper';
import cookieHelper from '../helpers/cookieHelper';

// TYPE
export const LOAD_PROFILE_SUCCESS = 'redux-ducks/auth/LOAD_PROFILE_SUCCESS';
export const LOGIN_SUCCESS = 'redux-ducks/auth/LOGIN_SUCCESS';
export const SET_DEFAULT = 'redux-ducks/auth/SET_DEFAULT';
// export const SET_STATUS_PAGE = 'redux-ducks/auth/SET_STATUS_PAGE';

const initialState = {
  loading: false,
  loaded: false,
  error: null,
  current: {
    type: 'guest',
  },
  token: false,
};

// ACTIONS
export function setDefault() {
  return {
    type: SET_DEFAULT
  };
}

function login(payload) {
  return {
    type: LOGIN_SUCCESS,
    result: payload,
  }
}

function getProfile(payload) {
  return {
    type: LOAD_PROFILE_SUCCESS,
    result: payload,
  };
}

export const loginAction = payload => async (dispatch) => {
  try {
    const data = await api.auth.login('auth/login', payload);
    
    return dispatch(login(data));
  } catch (error) {
    const { status, statusText } = error;

    if (!status) {
      showError('Something went wrong. Try later');
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

    return dispatch(login(data));
  } catch (error) {
    const { data, status, statusText } = error;

    if (!data || !data.errors) {
      showError('Something went wrong. Try later');
    }

    if (status === 500) {
      showError(statusText);
    }

    throw error;
  }
};

export const loadAuth = () => async (dispatch) => {
  try {
    const data = await api.auth.profile('auth/profile');

    return dispatch(getProfile(data));
  } catch (error) {
    dispatch(setDefault());
    const { data, status, statusText } = error;

    if (!data || !data.errors) {
      showError('Something went wrong. Try later');
    }

    if (status === 500) {
      showError(statusText);
    }

    throw error;
  }
};

export const logoutAction = () => (dispatch) => {
  cookieHelper.remove('token');

  if (!cookieHelper.get('token')) {
    dispatch(setDefault());
    return Promise.resolve(true);
  }

  Promise.reject({ errors: { token:  'Enable delete Token' }});
};

const loginRequestSuccess = action => (state) => {
  const { token } = action.result;
  api.auth.setAuthToken(token);
  cookieHelper.set('token', token);

  return {
    ...state,
    token: true,
  };
}

const profileRequestSuccess = action => (state) => {
  const { user } = action.result;
  return {
    ...state,
    current: {
      type: 'member',
      ...user,
    }
  };
}

const setDefaultSuccess = () => {
  cookieHelper.remove('token');
  return {
    ...initialState,
    loaded: true,
  };
};

const actionsLookup = {
  [LOGIN_SUCCESS]: (state, action) => loginRequestSuccess(action)(state),
  [LOAD_PROFILE_SUCCESS]:  (state, action) => profileRequestSuccess(action)(state),
  [SET_DEFAULT]: () => setDefaultSuccess(),
};

export default function reducer(state = initialState, action) {
  if (isFunction(actionsLookup[action.type])) return actionsLookup[action.type](state, action);

  return state;
}