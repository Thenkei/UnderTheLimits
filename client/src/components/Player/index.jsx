import React from 'react';
import PropTypes from 'prop-types';

import { Chip } from '..';

const Player = ({ value, noScore }) => (
  <React.Fragment>
    <dt>
      {value.isGameMaster ? '>' : ''}
      <Chip label={value.name} />
      { !noScore && <Chip label={`${value.score} ${' '}pt(s)`} /> }
    </dt>
  </React.Fragment>
);

Player.defaultProps = {
  value: {
    name: '',
    score: 0,
    isGameMaster: false,
  },
  noScore: false,
};

Player.propTypes = {
  value: PropTypes.shape({ name: PropTypes.string, score: PropTypes.number }),
  noScore: PropTypes.bool,

};


export default Player;
