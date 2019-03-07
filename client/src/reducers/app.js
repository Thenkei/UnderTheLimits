import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE,
} from './constants';

import { createPlayer, updateLobby } from '../services/Api';

/**
 * Constants
 */
const APP_INIT = 'APP_INIT';
const CREATE_PLAYER = 'CREATE_PLAYER';
const UPDATE_LOBBY = 'UPDATE_LOBBY';

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
      }, 3000);
    } catch (error) {
      dispatch(initFailure(error));
    }
  };
}

function createPlayerRequest() {
  return { type: CREATE_PLAYER + FETCH_REQUEST };
}
function createPlayerSucess(player) {
  return { type: CREATE_PLAYER + FETCH_SUCCESS, player };
}
function createPlayerFailure(error) {
  return { type: CREATE_PLAYER + FETCH_FAILURE, error };
}

export function wssCreatePlayer(wsCreatePlayerReq) {
  return (dispatch) => {
    try {
      dispatch(createPlayerRequest());
      createPlayer(wsCreatePlayerReq, (err, wsCreatePlayerRes) => {
        if (err) {
          throw err;
        }        
        dispatch(createPlayerSucess({ player: wsCreatePlayerRes }));
      });
    } catch (error) {
      dispatch(createPlayerFailure(error));
    }
  };
}

function updateLobbyRequest() {
  return { type: UPDATE_LOBBY + FETCH_REQUEST };
}
function updateLobbySucess(lobby) {
  return { type: UPDATE_LOBBY + FETCH_SUCCESS, lobby };
}
function updateLobbyFailure(error) {
  return { type: UPDATE_LOBBY + FETCH_FAILURE, error };
}

export function wssUpdateLobby() {
  return (dispatch) => {
    try {
      dispatch(updateLobbyRequest());
      updateLobby((err, wsUpdateLobbyRes) => {
        if (err) {
          throw err;
        }
        dispatch(updateLobbySucess(wsUpdateLobbyRes));
      });
    } catch (error) {
      dispatch(updateLobbyFailure(error));
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
  [CREATE_PLAYER + FETCH_REQUEST]: state => ({
    ...state,
    error: null,
    isLoading: true,
  }),
  [CREATE_PLAYER + FETCH_SUCCESS]: (state, { player }) => ({
    ...state,
    player,
    isLoading: false,
  }),
  [CREATE_PLAYER + FETCH_FAILURE]: (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  }),
  [CREATE_PLAYER + FETCH_REQUEST]: state => ({
    ...state,
    error: null,
    isLoading: true,
  }),
  [UPDATE_LOBBY + FETCH_SUCCESS]: (state, { lobby }) => ({
    ...state,
    lobby,
    isLoading: false,
  }),
  [UPDATE_LOBBY + FETCH_FAILURE]: (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  }),
};
