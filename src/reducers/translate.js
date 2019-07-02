import isFunction from 'lodash/isFunction';
import flowRight from 'lodash/flowRight';
import api from '../api';
import cookieHelper from '../helpers/cookieHelper';


const SET_LOCALE ='redux-ducks/localization/SET_LOCALE';

const LOAD = 'redux-ducks/localization/LOAD';
const LOAD_SUCCESS = 'redux-ducks/localization/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-ducks/localization/LOAD_FAIL';
const EDIT_STOP = 'redux-ducks/localization/EDIT_STOP';
const SAVE = 'redux-ducks/localization/SAVE';
const SAVE_SUCCESS = 'redux-ducks/localization/SAVE_SUCCESS';
const SAVE_FAIL = 'redux-ducks/localization/SAVE_FAIL';

const initialState = {
  loaded: false,
  data: {},
  currentLang: 'en',
  langs: ['en', 'ru', 'ua'],
};

export function getLocale() {
  const locale = cookieHelper.get('locale');

  return locale || 'en';
}

export function load(payload) {
  return {
    type: LOAD_SUCCESS,
    result: payload,
  };
}

function setLocale(payload) {
  return {
    type: SET_LOCALE,
    result: payload,
  };
}

export const loadTranslates = () => async (dispatch, getState) => {
  try {
    const { currentLang } = getState().translate;
    const params = {
      lang: currentLang,
    }
    const data = await api.ApiClient.getExternal('/api/v1/translation', params);

    return dispatch(load(data));
  } catch (error) {
    throw error;
  }

}

/**
 * Set new lang, and load translates
 * @param {string} locale
 */
export const changeLocale = locale => async (dispatch) => {
  // [1] set new locale
  await dispatch(setLocale(locale));
  // [2] load translates
  await dispatch(loadTranslates())
  return Promise.resolve(locale);
}

const setLocaleSuccess = action => state => {
  return {
    ...state,
    currentLang: action.result
  }
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

const updateLocalization = action => (state) => {
  return {
    ...state,
    data: {
      ...action.result.translations,
    }
  };
};

const updateRequestOnLoadFail = (action, value) => state => ({
  ...state,
  loading: false,
  loaded: value,
  data: {},
  error: action.error
});

const editStopSuccess = action => state => ({
  ...state,
  editing: {
    ...state.editing,
    [action.id]: false,
  }
});

const updateRequestOnSave = state => ({
  ...state, // 'saving' flag handled by redux-form
});

const updateRequestOnSaveSuccess = action => (state) => {
  const data = [...state.data];
  data[action.result.id - 1] = action.result;

  return {
    ...state,
    data,
    editing: {
      ...state.editing,
      [action.id]: false
    },
    saveError: {
      ...state.saveError,
      [action.id]: null
    }
  };
};

const updateRequestOnSaveFail = action => (state) => {
  if (typeof action.error === 'string') {
    return {
      ...state,
      saveError: {
        ...state.saveError,
        [action.id]: action.error
      }
    };
  }

  return state;
};

const actionsLookup = {
  [SET_LOCALE]: (state, action) => setLocaleSuccess(action)(state),
  [LOAD]: state => updateRequestOnLoad(true)(state),
  [LOAD_SUCCESS]: (state, action) => flowRight(
    updateRequestOnLoadSuccess(false),
    updateLocalization(action),
  )(state),
  [LOAD_FAIL]: (state, action) => updateRequestOnLoadFail(action, false)(state),
  [EDIT_STOP]: (state, action) => editStopSuccess(action)(state),
  [SAVE]: state => updateRequestOnSave()(state),
  [SAVE_SUCCESS]: (state, action) => updateRequestOnSaveSuccess(action)(state),
  [SAVE_FAIL]: (state, action) => updateRequestOnSaveFail(action)(state),
};

export default function reducer(state = initialState, action) {
  if (isFunction(actionsLookup[action.type])) return actionsLookup[action.type](state, action);

  return state;
}
