import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE,
} from './constants';

import {
  createPlayer,
  updateLobby,
  updateChannel,
  gotoChannel,
  createChannel,
} from '../services/Api';

/**
 * Constants
 */
const APP_INIT = '@UTL/APP_INIT';
const CREATE_PLAYER = '@UTL/CREATE_PLAYER';
const CREATE_CHANNEL = '@UTL/CREATE_CHANNEL';
const UPDATE_LOBBY = '@UTL/UPDATE_LOBBY';
const UPDATE_CHANNEL = '@UTL/UPDATE_CHANNEL';
const GOTO_CHANNEL = '@UTL/GOTO_CHANNEL';
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
        localStorage.meId = wsCreatePlayerRes.id;
        if (wsCreatePlayerRes) {
          dispatch(createPlayerSucess(wsCreatePlayerRes));
        }
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
        if (wsUpdateLobbyRes) {
          dispatch(updateLobbySucess(wsUpdateLobbyRes));
        }
      });
    } catch (error) {
      dispatch(updateLobbyFailure(error));
    }
  };
}

function updateChannelRequest() {
  return { type: UPDATE_CHANNEL + FETCH_REQUEST };
}
function updateChannelSucess({ player, currentChannel }) {
  return { type: UPDATE_CHANNEL + FETCH_SUCCESS, player, currentChannel };
}
function updateChannelFailure(error) {
  return { type: UPDATE_CHANNEL + FETCH_FAILURE, error };
}

export function wssUpdateChannel() {
  return (dispatch) => {
    try {
      dispatch(updateChannelRequest());
      updateChannel((err, wsUpdateChannelRes) => {
        if (err) {
          throw err;
        }
        const { meId } = localStorage;
        const me = wsUpdateChannelRes.players.find(c => c.id === meId);
        const currentChannel = wsUpdateChannelRes;
        const response = { currentChannel };
        if (me) {
          response.player = me;
        }
        dispatch(updateChannelSucess(response));
      });
    } catch (error) {
      dispatch(updateChannelFailure(error));
    }
  };
}

function createChannelRequest() {
  return { type: CREATE_CHANNEL + FETCH_REQUEST };
}
function createChannelSucess(lobby) {
  return { type: CREATE_CHANNEL + FETCH_SUCCESS, lobby };
}
function createChannelFailure(error) {
  return { type: CREATE_CHANNEL + FETCH_FAILURE, error };
}

export function wssCreateChannel(wssCreateChannelReq) {
  return (dispatch) => {
    try {
      dispatch(createChannelRequest(wssCreateChannelReq));
      createChannel(wssCreateChannelReq);
      dispatch(createChannelSucess());
    } catch (error) {
      dispatch(createChannelFailure(error));
    }
  };
}

function gotoChannelRequest() {
  return { type: GOTO_CHANNEL + FETCH_REQUEST };
}
function gotoChannelSucess(channel) {
  return { type: GOTO_CHANNEL + FETCH_SUCCESS, channel };
}
function gotoChannelFailure(error) {
  return { type: GOTO_CHANNEL + FETCH_FAILURE, error };
}

export function wssGotoChannel(wssGotoChannelReq) {
  return (dispatch) => {
    try {
      dispatch(gotoChannelRequest(wssGotoChannelReq));
      gotoChannel(wssGotoChannelReq, (err, wssGotoChannelRes) => {
        if (wssGotoChannelRes) {
          dispatch(gotoChannelSucess(wssGotoChannelRes));
        }
      });
    } catch (error) {
      dispatch(gotoChannelFailure(error));
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
  [UPDATE_LOBBY + FETCH_REQUEST]: state => ({
    ...state,
    error: null,
    isLoading: true,
  }),
  [UPDATE_CHANNEL + FETCH_SUCCESS]: (state, { player, currentChannel }) => ({
    ...state,
    player,
    currentChannel,
    isLoading: false,
  }),

  [UPDATE_CHANNEL + FETCH_FAILURE]: (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  }),
  [UPDATE_LOBBY + FETCH_REQUEST]: state => ({
    ...state,
    error: null,
    isLoading: true,
  }),
  [CREATE_CHANNEL + FETCH_SUCCESS]: state => ({
    ...state,
    isLoading: false,
  }),
  [CREATE_CHANNEL + FETCH_FAILURE]: (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  }),
  [CREATE_CHANNEL + FETCH_REQUEST]: state => ({
    ...state,
    error: null,
    isLoading: true,
  }),
  [GOTO_CHANNEL + FETCH_SUCCESS]: (state, { channel }) => ({
    ...state,
    channel,
    isLoading: false,
  }),
  [GOTO_CHANNEL + FETCH_FAILURE]: (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  }),
  [GOTO_CHANNEL + FETCH_REQUEST]: state => ({
    ...state,
    error: null,
    isLoading: true,
  }),
};
