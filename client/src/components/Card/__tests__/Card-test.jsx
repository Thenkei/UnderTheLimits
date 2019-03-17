import React from 'react';
import renderer from 'react-test-renderer';

import Card from '..';

it('renders correctly with a few props', () => {
  const tree = renderer.create(
    <Card
      value="BLBL - C'est un test !"
      checked
    />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
