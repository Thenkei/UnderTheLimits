import { FETCH_REQUEST, FETCH_SUCCESS } from './constants';

import { updateLobby } from '../services/Api';
import { playSound } from './app';

const UPDATE_LOBBY = '@UTL/UPDATE_LOBBY';

/**
 * Actions
 */
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
        if (wsUpdateLobbyRes.event === 'playerCreated') {
          dispatch(playSound('new-chalenger.mp3'));
        }
        dispatch(updateLobbySucess(wsUpdateLobbyRes));
      }
    });
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
  [UPDATE_LOBBY + FETCH_SUCCESS]: (state, { lobby }) => ({
    ...state,
    ...lobby,
  }),
};
