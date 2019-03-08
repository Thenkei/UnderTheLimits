import React from 'react';
import { mountWithRR as mount } from '../../../test/helpers';

import App from '.';

it('renders without crashing', () => {
  mount(
    <App />,
    {
      app: {
        isLoading: false,
      },
    },
  );
});
