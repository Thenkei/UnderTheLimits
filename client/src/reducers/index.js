import { combineReducers } from 'redux';
import {
  initialState as appInitialState,
  handlers as appHandlers,
} from './app';

// Based on: http://redux.js.org/docs/recipes/ReducingBoilerplate.html
function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  };
}

const appReducers = createReducer(appInitialState, appHandlers);

export default combineReducers({ app: appReducers });
