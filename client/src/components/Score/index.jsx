import React from 'react';
import PropTypes from 'prop-types';

import Player from '../Player';

const Score = ({ players }) => (
  <dl>
    {
      players.map(p => (
        // Without the `key`, React will fire a key warning
        <div key={p.id}>
          <Player value={p} />
        </div>
      ))
    }
  </dl>
);

Score.defaultProps = {
  players: [],
};

Score.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({})),
};

export default Score;
