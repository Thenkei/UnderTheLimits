import { FETCH_REQUEST, FETCH_SUCCESS } from './constants';

import {
  startGame,
  selectedJudgment,
  selectedAnswers,
} from '../services/Api';

const START_GAME = '@UTL/START_GAME';
const SELECT_JUDGMENT = '@UTL/SELECT_JUDGMENT';
const SELECTED_ANSWERS = '@UTL/SELECTED_ANSWERS';

/**
 * Actions
 */
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
function selectedAnswersSucess() {
  return { type: SELECTED_ANSWERS + FETCH_SUCCESS };
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
export const initialState = null;

/**
* Handlers
*/
export const handlers = {};
