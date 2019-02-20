import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import App from './screens/App';
import Legals from './screens/Legals';
import NoMatch from './screens/NoMatch';

import './style/style.scss';

const router = (
  <Router>
    <React.Fragment>
      <Route exact path="/" component={App} />
      <Route path="/mentions-legales" component={Legals} />
      <Route component={NoMatch} />
      <React.Fragment>
        <Link to="/mentions-legales">Mention légales</Link>
        <a href="https://github.com/Thenkei/UnderTheLimits">Github</a>
      </React.Fragment>
    </React.Fragment>
  </Router>
);
ReactDOM.render(router, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
