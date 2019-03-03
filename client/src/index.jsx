import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import App from './screens/App';
import Legals from './screens/Legals';
import NoMatch from './screens/NoMatch';

import './style/style.scss';

const router = (
  <Router>
    <Switch>
      <Route exact path='/' component={App} />
      <Route exact path='/mentions-legales' component={Legals} />
      <Route component={NoMatch} />
    </Switch>
  </Router>
);
ReactDOM.render(router, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
