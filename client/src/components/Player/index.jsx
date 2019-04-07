import React from 'react';
import PropTypes from 'prop-types';

import { Chip, Avatar } from '..';

const Player = ({ value, noScore }) => (
  <dt>
    {value.isGameMaster ? '>' : ''}
    <Avatar src={`${window.location.origin}/avatars/${value.name}.png`} />
    <Chip label={value.name} />
    { !noScore && <Chip label={`${value.score} ${' '}pt(s)`} /> }
  </dt>
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
