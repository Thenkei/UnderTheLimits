import { FETCH_REQUEST, FETCH_SUCCESS } from './constants';

import { createPlayer } from '../services/Api';

const CREATE_PLAYER = '@UTL/CREATE_PLAYER';
const UPDATE_PALYER = '@UTL/UPDATE_PLAYER';

/**
 * Actions
 */
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
      if (wsCreatePlayerRes) {
        dispatch(createPlayerSucess(wsCreatePlayerRes));
      }
    });
  };
}

export function updatePlayer(players) {
  return { type: UPDATE_PALYER, players };
}

/**
* InitialState
*/
export const initialState = null;

/**
* Handlers
*/
export const handlers = {
  [CREATE_PLAYER + FETCH_SUCCESS]: (state, { player }) => ({
    ...state,
    ...player,
  }),
  [UPDATE_PALYER]: (state, { players }) => {
    const player = players.find(p => p.id === state.id);
    return {
      ...state,
      ...player,
    };
  },
};
