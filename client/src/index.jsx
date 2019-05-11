import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider, connect } from 'react-redux';

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import { MuiThemeProvider, CssBaseline } from './components';

import { RootLayout } from './layouts';

import Index from './screens/Index';
import Lobby from './screens/Lobby';
import UnderTheLimits from './screens/Games/UnderTheLimits';
import NoMatch from './screens/NoMatch';


import themes from './style/theme';
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

let Main = props => (
  <MuiThemeProvider theme={themes[props.theme]}>
    <Router>
      <RootLayout>
        <Switch>
          <Route exact path='/' component={Index} />
          <Route exact path='/lobby' component={Lobby} />
          <Route path='/underthelimits/:id' component={UnderTheLimits} />
          <Route component={NoMatch} />
        </Switch>
      </RootLayout>
    </Router>
    <CssBaseline />
  </MuiThemeProvider>
);

Main.propTypes = {
  theme: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  theme: state.player && state.player.isGameMaster ? 'GameMasterTheme' : 'UtlTheme',
});

Main = connect(mapStateToProps, null)(Main);

const router = (
  <Provider store={store}>
    <Main />
  </Provider>
);


ReactDOM.render(router, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
