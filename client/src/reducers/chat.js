import { List } from 'immutable';

import {
  FETCH_SUCCESS,
} from './constants';

import {
  chatMessages,
  sendMessage,
} from '../services/Api';


/**
 * Constants
 */
const CHAT_MESSAGES = '@CHAT/CHAT_MESSAGES';
const SEND_MESSAGE = '@CHAT/SEND_MESSAGE';
/**
 * Actions
 */
function chatMessagesSuccess(message) {
  return { type: CHAT_MESSAGES + FETCH_SUCCESS, message };
}

function sendMessageSuccess() {
  return { type: SEND_MESSAGE + FETCH_SUCCESS };
}


export function wssChatMessages() {
  return (dispatch) => {
    chatMessages((wsChatMessages) => {
      dispatch(chatMessagesSuccess(wsChatMessages));
    });
  };
}

export function wssSendMessage(msg) {
  return (dispatch) => {
    sendMessage(msg);
    dispatch(sendMessageSuccess());
  };
}

/**
* InitialState
*/
export const initialState = {
  messages: List(),
};

/**
* Handlers
*/
export const handlers = {
  [CHAT_MESSAGES + FETCH_SUCCESS]: (state, { message }) => {
    let { messages } = state;
    if (messages.size >= 25) {
      messages = messages.shift();
    }
    messages = messages.push(message);
    return {
      ...state,
      messages,
    };
  },
};
