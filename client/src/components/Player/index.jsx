import React from 'react';
import PropTypes from 'prop-types';

import {
  Avatar,
  Badge,
  Chip,
  withStyles,
} from '..';

import styles from './styles';

const Player = ({ classes, value, noScore }) => {
  const Wrapper = noScore ? React.Fragment : Badge;
  const props = noScore ? {} : { badgeContent: value.score, color: 'primary' };
  return (
    <dt>
      <Wrapper {...props}>
        <Chip
          icon={<Avatar src={`${window.location.origin}/avatars/${value.name}.png`} />}
          label={value.isGameMaster ? `>${value.name}` : value.name}
          className={classes.playerChip}
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
  classes: PropTypes.object.isRequired,

  value: PropTypes.shape({ name: PropTypes.string, score: PropTypes.number }),
  noScore: PropTypes.bool,

};


export default withStyles(styles, { withTheme: true })(Player);
