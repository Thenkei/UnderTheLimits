import React from 'react';
import PropTypes from 'prop-types';

import { Avatar, Badge, Chip } from '..';

const Player = ({ value, noScore }) => {
  const Wrapper = noScore ? React.Fragment : Badge;
  const props = noScore ? {} : { badgeContent: value.score, color: 'primary' };
  return (
    <dt>
      <Wrapper {...props}>
        <Chip
          icon={<Avatar src={`${window.location.origin}/avatars/${value.name}.png`} />}
          label={value.isGameMaster ? `>${value.name}` : value.name}
          style={{ marginTop: '5px' }}
          variant='outlined'
        />
      </Wrapper>
      { !noScore && <Chip label={`${value.score} ${' '}pt(s)`} /> }
    </dt>
  );
};

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
