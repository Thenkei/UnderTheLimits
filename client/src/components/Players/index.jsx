import React from 'react';
import PropTypes from 'prop-types';

import Player from '../Player';

const Score = ({ players, noScore = false }) => (
  <dl>
    {
      players.map(p => (
        // Without the `key`, React will fire a key warning
        <div key={p.id}>
          <Player value={p} noScore={noScore} />
        </div>
      ))
    }
  </dl>
);

Score.defaultProps = {
  players: [],
  noScore: true,
};

Score.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({})),
  noScore: PropTypes.bool,
};

export default Score;
