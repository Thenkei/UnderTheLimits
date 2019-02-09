import React from 'react';
import PropTypes from 'prop-types';

import { Row } from 'react-bootstrap';
import Player from './Player';

const Score = ({ players }) => (
  <dl>
    {
      players.map(p => (
        // Without the `key`, React will fire a key warning
        <Row key={p.id}>
          <Player value={p} />
        </Row>
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
