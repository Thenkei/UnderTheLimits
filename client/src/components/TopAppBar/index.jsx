import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './style.scss';
import { IconButton, Icon } from '..';

import { toggleSound } from '../../reducers/app';

const TopAppBar = props => (
  <header className='TopAppBar'>
    <img
      src='/public/images/UTL_Logo.png'
      alt='under-the-limits'
      className='TopAppBar-logo'
    />
    <IconButton onClick={props.toggleSound}>
      <Icon>{props.isSoundMuted ? 'volume_up' : 'volume_off'}</Icon>
    </IconButton>
  </header>
);

TopAppBar.propTypes = {
  isSoundMuted: PropTypes.bool.isRequired,
  toggleSound: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isSoundMuted: state.app.isSoundMuted,
});

const mapDispatchToProps = dispatch => ({
  toggleSound: () => dispatch(toggleSound()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopAppBar);
