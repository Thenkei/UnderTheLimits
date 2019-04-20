import React from 'react';
import PropTypes from 'prop-types';

import {
  Avatar,
  Tooltip,
  withStyles,
} from '..';

import styles from './styles';

const Player = ({ classes, value }) => (
  <React.Fragment>
    <Tooltip title={value.name} placement='right'>
      <Avatar
        src={`${window.location.origin}/avatars/${value.name}.png`}
        className={classes.playerAvatar}
      />
    </Tooltip>
  </React.Fragment>
);

Player.defaultProps = {
  value: {
    name: '',
    score: 0,
    isGameMaster: false,
  },
};

Player.propTypes = {
  classes: PropTypes.object.isRequired,

  value: PropTypes.shape({ name: PropTypes.string, score: PropTypes.number }),

};


export default withStyles(styles, { withTheme: true })(Player);
