/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

const mockStore = configureStore([thunkMiddleware]);
export const mountWithRedux = (component, initialState = {}) => (
  mount(
    <Provider store={mockStore(initialState)}>
      {component}
    </Provider>,
  )
);

export const mountWithRouter = component => (
  mount(
    <Router>
      {component}
    </Router>,
  )
);

export const mountWithRR = (component, initialState = {}) => (
  mount(
    <Provider store={mockStore(initialState)}>
      <Router>
        {component}
      </Router>
    </Provider>,
  )
);
