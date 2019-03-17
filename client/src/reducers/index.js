import { combineReducers } from 'redux';

import {
  initialState as appInitialState,
  handlers as appHandlers,
} from './app';

import {
  initialState as channelInitialState,
  handlers as channelHandlers,
} from './channel';

import {
  initialState as gameInitialState,
  handlers as gameHandlers,
} from './game';

import {
  initialState as lobbyInitialState,
  handlers as lobbyHandlers,
} from './lobby';

import {
  initialState as playerInitialState,
  handlers as playerHandlers,
} from './player';

import {
  initialState as chatInitialState,
  handlers as chatHandlers,
} from './chat';

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
const channelReducers = createReducer(channelInitialState, channelHandlers);
const gameReducers = createReducer(gameInitialState, gameHandlers);
const lobbyReducers = createReducer(lobbyInitialState, lobbyHandlers);
const playerReducers = createReducer(playerInitialState, playerHandlers);
const chatReducer = createReducer(chatInitialState, chatHandlers);

export default combineReducers({
  app: appReducers,
  channel: channelReducers,
  game: gameReducers,
  lobby: lobbyReducers,
  player: playerReducers,
  chat: chatReducer,
});
