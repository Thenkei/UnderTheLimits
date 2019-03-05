import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE,
} from './constants';

import { createPlayer } from '../services/Api';

/**
 * Constants
 */
const APP_INIT = 'APP_INIT';
const CREATE_PLAYER = 'CREATE_PLAYER';

/**
 * Actions
 */
function initRequest() {
  return { type: APP_INIT + FETCH_REQUEST };
}
function initSucess() {
  return { type: APP_INIT + FETCH_SUCCESS };
}
function initFailure(error) {
  return { type: APP_INIT + FETCH_FAILURE, error };
}

export function init() {
  return (dispatch) => {
    try {
      dispatch(initRequest());
      // simulate webservice request
      setTimeout(() => {
        // const res = await webservice();
        dispatch(initSucess(/* res */));
      }, 1000);
    } catch (error) {
      dispatch(initFailure(error));
    }
  };
}

function createPlayerRequest() {
  return { type: CREATE_PLAYER + FETCH_REQUEST };
}
function createPlayerSucess() {
  return { type: CREATE_PLAYER + FETCH_SUCCESS };
}
function createPlayerFailure(error) {
  return { type: CREATE_PLAYER + FETCH_FAILURE, error };
}

export function createPlayer(wsCreatePlayerReq) {
  return (dispatch) => {
    try {
      dispatch(createPlayerRequest(wsCreatePlayerReq));
      Api.createPlayer(wsCreatePlayerReq);
      dispatch(createPlayerSucess());
    } catch (error) {
      dispatch(createPlayerFailure(error));
    }
  };
}

/**
 * InitialState
 */
export const initialState = {
  isLoading: false,
  error: null,
};

/**
 * Handlers
 */
export const handlers = {
  [APP_INIT + FETCH_REQUEST]: state => ({
    ...state,
    error: null,
    isLoading: true,
  }),
  [APP_INIT + FETCH_SUCCESS]: state => ({
    ...state,
    isLoading: false,
  }),
  [APP_INIT + FETCH_FAILURE]: (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  }),
};

