import React from 'react';
import renderer from 'react-test-renderer';

import CreateChannel from '..';

it('renders correctly', () => {
  const tree = renderer.create(
    <CreateChannel />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
