import React from 'react';
import renderer from 'react-test-renderer';

import UnderTheLimits from '..';

// @TODO - Proper testing ?

it('renders correctly', () => {
  const tree = renderer.create(
    <UnderTheLimits
      selectedAnswers={() => {}}
      selectedJudgment={() => {}}
    />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
