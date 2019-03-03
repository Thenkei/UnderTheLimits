import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE,
} from './constants';

/**
 * Constants
 */
const APP_INIT = 'APP_INIT';

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
};
