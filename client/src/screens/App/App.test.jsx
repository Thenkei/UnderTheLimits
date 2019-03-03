import React from 'react';
import renderer from 'react-test-renderer';

import App from '.';

it('renders without crashing', () => {
  renderer.create(<App />);
});
