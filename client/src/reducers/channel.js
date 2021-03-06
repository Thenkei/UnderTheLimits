import { FETCH_REQUEST, FETCH_SUCCESS } from './constants';

import {
  updateChannel,
  gotoChannel,
  createChannel,
} from '../services/Api';

import { updatePlayer } from './player';

const CREATE_CHANNEL = '@UTL/CREATE_CHANNEL';
const UPDATE_CHANNEL = '@UTL/UPDATE_CHANNEL';
const GOTO_CHANNEL = '@UTL/GOTO_CHANNEL';

/**
 * Actions
 */
function updateChannelRequest() {
  return { type: UPDATE_CHANNEL + FETCH_REQUEST };
}
function updateChannelSucess(channel) {
  return { type: UPDATE_CHANNEL + FETCH_SUCCESS, channel };
}

export function wssUpdateChannel() {
  return (dispatch) => {
    dispatch(updateChannelRequest());
    updateChannel((wsUpdateChannelRes) => {
      if (wsUpdateChannelRes) {
        dispatch(updateChannelSucess(wsUpdateChannelRes));
        if (wsUpdateChannelRes.players) {
          dispatch(updatePlayer(wsUpdateChannelRes.players));
        }
      }
    });
  };
}

function createChannelRequest() {
  return { type: CREATE_CHANNEL + FETCH_REQUEST };
}
function createChannelSucess() {
  return { type: CREATE_CHANNEL + FETCH_SUCCESS };
}

export function wssCreateChannel(channel) {
  return (dispatch) => {
    dispatch(createChannelRequest());
    createChannel(channel);
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
    dispatch(gotoChannelRequest());
    gotoChannel(wssGotoChannelReq);
    dispatch(gotoChannelSucess());
  };
}

/**
* InitialState
*/
export const initialState = null;

/**
* Handlers
*/
export const handlers = {
  [UPDATE_CHANNEL + FETCH_SUCCESS]: (state, { channel }) => ({
    ...state,
    ...channel,
  }),
};
