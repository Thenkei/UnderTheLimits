import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import App from './screens/App';
import Index from './screens/Index';
import Legals from './screens/Legals';
import NoMatch from './screens/NoMatch';

import './style/style.scss';

import reducers from './reducers';

/**
 * Create redux store
 */
// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunkMiddleware)),
);

const router = (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path='/' component={Index} />
        <Route exact path='/app' component={App} />
        <Route exact path='/mentions-legales' component={Legals} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  </Provider>
);
ReactDOM.render(router, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
