import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
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
  error as serverError,
  success as successError,
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
const SUCCESS_MESSAGE = '@APP/SUCCESS_MESSAGE';

const DEFAULT_ERROR_TIMEOUT = 3000;
const DEFAULT_SUCCESS_TIMEOUT = 8000;

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

function displayError(message) {
  return { type: ERROR_MESSAGE, message };
}

export function displayErrorMessage(message) {
  return dispatch => dispatch(displayError(message));
}

export function displaySuccessMessage(message) {
  return dispatch => dispatch({ type: SUCCESS_MESSAGE, message });
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

function createPlayerRequest() {
  return { type: CREATE_PLAYER + FETCH_REQUEST };
}
function createPlayerSucess(player) {
  return { type: CREATE_PLAYER + FETCH_SUCCESS, player };
}

export function wssCreatePlayer(wsCreatePlayerReq) {
  return (dispatch) => {
    dispatch(createPlayerRequest());
    createPlayer(wsCreatePlayerReq, (wsCreatePlayerRes) => {
      // eslint-disable-next-line prefer-destructuring
      id = wsCreatePlayerRes.id;
      if (wsCreatePlayerRes) {
        dispatch(createPlayerSucess(wsCreatePlayerRes));
      }
    });
  };
}

function updateLobbyRequest() {
  return { type: UPDATE_LOBBY + FETCH_REQUEST };
}
function updateLobbySucess(lobby) {
  return { type: UPDATE_LOBBY + FETCH_SUCCESS, lobby };
}

export function wssUpdateLobby() {
  return (dispatch) => {
    dispatch(updateLobbyRequest());
    updateLobby((wsUpdateLobbyRes) => {
      if (wsUpdateLobbyRes) {
        dispatch(updateLobbySucess(wsUpdateLobbyRes));
      }
    });
  };
}

function updateChannelRequest() {
  return { type: UPDATE_CHANNEL + FETCH_REQUEST };
}
function updateChannelSucess({ player, currentChannel }) {
  return { type: UPDATE_CHANNEL + FETCH_SUCCESS, player, currentChannel };
}

export function wssUpdateChannel() {
  return (dispatch) => {
    dispatch(updateChannelRequest());
    updateChannel((wsUpdateChannelRes) => {
      const me = wsUpdateChannelRes.players.find(c => c.id === id);
      const response = { currentChannel: wsUpdateChannelRes };
      if (me) {
        response.player = me;
      }
      dispatch(updateChannelSucess(response));
    });
  };
}

function createChannelRequest() {
  return { type: CREATE_CHANNEL + FETCH_REQUEST };
}
function createChannelSucess() {
  return { type: CREATE_CHANNEL + FETCH_SUCCESS };
}

export function wssCreateChannel(wssCreateChannelReq) {
  return (dispatch) => {
    dispatch(createChannelRequest(wssCreateChannelReq));
    createChannel(wssCreateChannelReq);
    dispatch(createChannelSucess());
  };
}

function gotoChannelRequest() {
  return { type: GOTO_CHANNEL + FETCH_REQUEST };
}
function gotoChannelSucess() {
  return { type: GOTO_CHANNEL + FETCH_SUCCESS };
}

export function wssGotoChannel(wssGotoChannelReq) {
  return (dispatch) => {
    dispatch(gotoChannelRequest(wssGotoChannelReq));
    gotoChannel(wssGotoChannelReq);
    dispatch(gotoChannelSucess());
  };
}

function startGameRequest() {
  return { type: START_GAME + FETCH_REQUEST };
}
function startGameSucess() {
  return { type: START_GAME + FETCH_SUCCESS };
}

export function wssStartGame() {
  return (dispatch) => {
    dispatch(startGameRequest());
    startGame();
    dispatch(startGameSucess());
  };
}

function selectedJudgmentRequest() {
  return { type: SELECT_JUDGMENT + FETCH_REQUEST };
}
function selectedJudgmentSucess() {
  return { type: SELECT_JUDGMENT + FETCH_SUCCESS };
}

export function wssSelectJudgment(wsSelectedJudgmentReq) {
  return (dispatch) => {
    dispatch(selectedJudgmentRequest());
    selectedJudgment(wsSelectedJudgmentReq);
    dispatch(selectedJudgmentSucess());
  };
}

function selectedAnswersRequest() {
  return { type: SELECTED_ANSWERS + FETCH_REQUEST };
}
function selectedAnswersSucess(channel) {
  return { type: SELECTED_ANSWERS + FETCH_SUCCESS, channel };
}

export function wssSelectedAnswers(wsSelectedAnswersReq) {
  return (dispatch) => {
    dispatch(selectedAnswersRequest());
    selectedAnswers(wsSelectedAnswersReq);
    dispatch(selectedAnswersSucess());
  };
}


/**
* InitialState
*/
export const initialState = {
  isLoading: false,
  error: null,
  success: null,
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
  [CREATE_PLAYER + FETCH_REQUEST]: state => ({
    ...state,
    isLoading: true,
  }),
  [CREATE_PLAYER + FETCH_SUCCESS]: (state, { player }) => ({
    ...state,
    player,
    isLoading: false,
  }),
  [UPDATE_LOBBY + FETCH_REQUEST]: state => ({
    ...state,
    isLoading: true,
  }),
  [UPDATE_LOBBY + FETCH_SUCCESS]: (state, { lobby }) => ({
    ...state,
    lobby,
    isLoading: false,
  }),
  [UPDATE_CHANNEL + FETCH_REQUEST]: state => ({
    ...state,
    isLoading: true,
  }),
  [UPDATE_CHANNEL + FETCH_SUCCESS]: (state, { player, currentChannel }) => ({
    ...state,
    player,
    currentChannel,
    isLoading: false,
  }),
  [CREATE_CHANNEL + FETCH_REQUEST]: state => ({
    ...state,
    isLoading: true,
  }),
  [CREATE_CHANNEL + FETCH_SUCCESS]: state => ({
    ...state,
    isLoading: false,
  }),
  [GOTO_CHANNEL + FETCH_REQUEST]: state => ({
    ...state,
    isLoading: true,
  }),
  [GOTO_CHANNEL + FETCH_SUCCESS]: (state, { channel }) => ({
    ...state,
    channel,
    isLoading: false,
  }),
  [START_GAME + FETCH_REQUEST]: state => ({
    ...state,
    isLoading: true,
  }),
  [START_GAME + FETCH_SUCCESS]: state => ({
    ...state,
    isLoading: false,
  }),
  [SELECT_JUDGMENT + FETCH_REQUEST]: state => ({
    ...state,
    isLoading: true,
  }),
  [SELECT_JUDGMENT + FETCH_SUCCESS]: state => ({
    ...state,
    isLoading: false,
  }),
  [SELECTED_ANSWERS + FETCH_REQUEST]: state => ({
    ...state,
    isLoading: true,
  }),
  [SELECTED_ANSWERS + FETCH_SUCCESS]: state => ({
    ...state,
    isLoading: false,
  }),
  [ERROR_MESSAGE]: (state, { message }) => ({
    ...state,
    errorMessage: message,
  }),
  [SUCCESS_MESSAGE]: (state, { message }) => ({
    ...state,
    success: message,
  }),
};
