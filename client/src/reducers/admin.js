import { FETCH_REQUEST, FETCH_SUCCESS } from './constants';

import { updateAdmin } from '../services/Api';

const UPDATE_ADMIN = '@UTL/UPDATE_ADMIN';

/**
 * Actions
 */
function updateAdminRequest() {
  return { type: UPDATE_ADMIN + FETCH_REQUEST };
}
function updateAdminSucess(lobby) {
  return { type: UPDATE_ADMIN + FETCH_SUCCESS, lobby };
}

export function wssUpdateAdmin() {
  return (dispatch) => {
    dispatch(updateAdminRequest());
    updateAdmin((wsUpdateAdminRes) => {
      if (wsUpdateAdminRes) {
        dispatch(updateAdminSucess(wsUpdateAdminRes));
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
  [UPDATE_ADMIN + FETCH_SUCCESS]: (state, { lobby }) => ({
    ...state,
    ...lobby,
  }),
};
