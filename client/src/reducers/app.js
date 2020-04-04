import { FETCH_REQUEST, FETCH_SUCCESS } from './constants';

import {
  error as serverError,
  success as successError,
} from '../services/Api';

/**
 * Constants
 */
const APP_INIT = '@UTL/APP_INIT';

const ADD = '_ADD';
const REMOVE = '_REMOVE';
const ERROR_MESSAGE = '@APP/ERROR_MESSAGE';
const SUCCESS_MESSAGE = '@APP/SUCCESS_MESSAGE';
const PLAY_SOUND = '@APP/PLAY_SOUND';
const STOP_SOUND = '@APP/STOP_SOUND';
const TOGGLE_SOUND = '@APP/TOGGLE_SOUND';

const DEFAULT_ERROR_TIMEOUT = 3000;
const DEFAULT_SUCCESS_TIMEOUT = 8000;

/**
 * Actions
 */
function initRequest() {
  return { type: APP_INIT + FETCH_REQUEST };
}
function initSucess() {
  return { type: APP_INIT + FETCH_SUCCESS };
}

function displayError(message) {
  return { type: ERROR_MESSAGE + ADD, message };
}

export function displayErrorMessage(message) {
  return dispatch => dispatch(displayError(message));
}
export function removeErrorMessage() {
  return dispatch => dispatch({ type: ERROR_MESSAGE + REMOVE });
}

export function displaySuccessMessage(message) {
  return dispatch => dispatch({ type: SUCCESS_MESSAGE + ADD, message });
}
export function removeSuccessMessage() {
  return dispatch => dispatch({ type: SUCCESS_MESSAGE + REMOVE });
}

export function playSound(url) {
  return dispatch => dispatch({ type: PLAY_SOUND, url });
}
export function stopSound() {
  return dispatch => dispatch({ type: STOP_SOUND });
}
export function toggleSound() {
  return dispatch => dispatch({ type: TOGGLE_SOUND });
}


export function wssInit() {
  return (dispatch) => {
    dispatch(initRequest());

    // Global error handling
    serverError((errMsg) => {
      dispatch(displayErrorMessage(errMsg));
      setTimeout(() => {
        dispatch(displayErrorMessage(null));
      }, DEFAULT_ERROR_TIMEOUT);
    });

    // Global (temp) success handling
    successError((successMsg) => {
      dispatch(displaySuccessMessage(successMsg));
      setTimeout(() => {
        dispatch(displaySuccessMessage(null));
      }, DEFAULT_SUCCESS_TIMEOUT);
    });

    dispatch(initSucess());
  };
}

/**
* InitialState
*/
export const initialState = {
  isLoading: false,
  error: null,
  success: null,
  sound: '',
  isPlaySound: false,
  isSoundMuted: false,
};

/**
* Handlers
*/
export const handlers = {
  [APP_INIT + FETCH_REQUEST]: state => ({
    ...state,
    isLoading: true,
  }),
  [APP_INIT + FETCH_SUCCESS]: state => ({
    ...state,
    isLoading: false,
  }),
  [ERROR_MESSAGE + ADD]: (state, { message }) => ({
    ...state,
    errorMessage: message,
  }),
  [SUCCESS_MESSAGE + ADD]: (state, { message }) => ({
    ...state,
    success: message,
  }),
  [PLAY_SOUND]: (state, { url }) => {
    if (state.isPlaySound) return state;
    return {
      ...state,
      sound: url,
      isPlaySound: true,
    };
  },
  [STOP_SOUND]: state => ({
    ...state,
    isPlaySound: false,
  }),
  [TOGGLE_SOUND]: state => ({
    ...state,
    isSoundMuted: !state.isSoundMuted,
  }),
  [ERROR_MESSAGE + REMOVE]: state => ({
    ...state,
    errorMessage: null,
  }),
  [SUCCESS_MESSAGE + REMOVE]: state => ({
    ...state,
    success: null,
  }),
};
