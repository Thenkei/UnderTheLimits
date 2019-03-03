import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

import App from '.';

it('renders without crashing', () => {
  renderer.create(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
});
