import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  IconButton,
  Icon,
  Tooltip,
  withStyles,
} from '..';

import { toggleSound } from '../../reducers/app';

import styles from './styles';

const TopAppBar = props => (
  <header className={props.classes.topAppBar}>
    <img
      src='/public/images/UTL_Logo.png'
      alt='under-the-limits'
      className={props.classes.topAppBarLogo}
    />
    <Tooltip title={props.isSoundMuted ? 'Activer' : 'Désactiver'}>
      <IconButton onClick={props.toggleSound}>
        <Icon>{props.isSoundMuted ? 'volume_up' : 'volume_off'}</Icon>
      </IconButton>
    </Tooltip>
  </header>
);

TopAppBar.propTypes = {
  classes: PropTypes.object.isRequired,

  isSoundMuted: PropTypes.bool.isRequired,
  toggleSound: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isSoundMuted: state.app.isSoundMuted,
});

const mapDispatchToProps = dispatch => ({
  toggleSound: () => dispatch(toggleSound()),
});

export default
withStyles(styles, { useTheme: true })(connect(mapStateToProps, mapDispatchToProps)(TopAppBar));
