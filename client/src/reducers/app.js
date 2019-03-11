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
  startGame,
  selectedJudgment,
  selectedAnswers,
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
const START_GAME = '@UTL/START_GAME';
const SELECT_JUDGMENT = '@UTL/SELECT_JUDGMENT';
const SELECTED_ANSWERS = '@UTL/SELECTED_ANSWERS';

const ERROR_MESSAGE = '@APP/ERROR_MESSAGE';

let id;
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

function displayError(message) {
  return { type: ERROR_MESSAGE, message };
}

export function displayErrorMessage(message) {
  return dispatch => dispatch(displayError(message));
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
        // eslint-disable-next-line prefer-destructuring
        id = wsCreatePlayerRes.id;
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
        const me = wsUpdateChannelRes.players.find(c => c.id === id);
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

function startGameRequest() {
  return { type: START_GAME + FETCH_REQUEST };
}
function startGameSucess(channel) {
  return { type: START_GAME + FETCH_SUCCESS, channel };
}
function startGameFailure(error) {
  return { type: START_GAME + FETCH_FAILURE, error };
}


export function wssStartGame() {
  return (dispatch) => {
    try {
      dispatch(startGameRequest());
      startGame();
      dispatch(startGameSucess());
    } catch (error) {
      dispatch(startGameFailure(error));
    }
  };
}

function selectedJudgmentRequest() {
  return { type: SELECT_JUDGMENT + FETCH_REQUEST };
}
function selectedJudgmentSucess(channel) {
  return { type: SELECT_JUDGMENT + FETCH_SUCCESS, channel };
}
function selectedJudgmentFailure(error) {
  return { type: SELECT_JUDGMENT + FETCH_FAILURE, error };
}


export function wssSelectJudgment(wsSelectedJudgmentReq) {
  return (dispatch) => {
    try {
      dispatch(selectedJudgmentRequest());
      selectedJudgment(wsSelectedJudgmentReq);
      dispatch(selectedJudgmentSucess());
    } catch (error) {
      dispatch(selectedJudgmentFailure(error));
    }
  };
}

function selectedAnswersRequest() {
  return { type: SELECTED_ANSWERS + FETCH_REQUEST };
}
function selectedAnswersSucess(channel) {
  return { type: SELECTED_ANSWERS + FETCH_SUCCESS, channel };
}
function selectedAnswersFailure(error) {
  return { type: SELECTED_ANSWERS + FETCH_FAILURE, error };
}


export function wssSelectedAnswers(wsSelectedAnswersReq) {
  return (dispatch) => {
    try {
      dispatch(selectedAnswersRequest());
      selectedAnswers(wsSelectedAnswersReq);
      dispatch(selectedAnswersSucess());
    } catch (error) {
      dispatch(selectedAnswersFailure(error));
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
  [UPDATE_LOBBY + FETCH_REQUEST]: state => ({
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
  [UPDATE_CHANNEL + FETCH_REQUEST]: state => ({
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
  [CREATE_CHANNEL + FETCH_REQUEST]: state => ({
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
  [GOTO_CHANNEL + FETCH_REQUEST]: state => ({
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
  [START_GAME + FETCH_REQUEST]: state => ({
    ...state,
    error: null,
    isLoading: true,
  }),
  [START_GAME + FETCH_SUCCESS]: state => ({
    ...state,
    isLoading: false,
  }),
  [START_GAME + FETCH_FAILURE]: (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  }),
  [SELECT_JUDGMENT + FETCH_REQUEST]: state => ({
    ...state,
    error: null,
    isLoading: true,
  }),
  [SELECT_JUDGMENT + FETCH_SUCCESS]: state => ({
    ...state,
    isLoading: false,
  }),
  [SELECT_JUDGMENT + FETCH_FAILURE]: (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  }),
  [SELECTED_ANSWERS + FETCH_REQUEST]: state => ({
    ...state,
    error: null,
    isLoading: true,
  }),
  [SELECTED_ANSWERS + FETCH_SUCCESS]: state => ({
    ...state,
    isLoading: false,
  }),
  [SELECTED_ANSWERS + FETCH_FAILURE]: (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  }),
  [ERROR_MESSAGE]: (state, { message }) => ({
    ...state,
    error: message,
    isLoading: false,
  }),
};
