/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Button,
  IconButton,
  Icon,
  Dialog,
  DialogActions,
  DialogTitle,
  Tooltip,
  withStyles,
} from '..';

import { toggleSound } from '../../reducers/app';

import styles from './styles';

const TopAppBar = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <header className={props.classes.topAppBar}>
      <img
        src='/public/images/UTL_Logo.png'
        alt='under-the-limits'
        className={props.classes.topAppBarLogo}
        onClick={() => {
          setOpen(true);
        }}
      />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>
          Êtes vous sur de vouloir quitter ?
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Annuler</Button>
          <Button
            onClick={() => {
              props.gotoHomepage();
              setOpen(false);
              window.location.reload();
            }}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Tooltip title={props.isSoundMuted ? 'Activer' : 'Désactiver'}>
        <IconButton onClick={props.toggleSound}>
          <Icon>{props.isSoundMuted ? 'volume_up' : 'volume_off'}</Icon>
        </IconButton>
      </Tooltip>
    </header>
  );
};

TopAppBar.propTypes = {
  classes: PropTypes.object.isRequired,

  isSoundMuted: PropTypes.bool.isRequired,
  toggleSound: PropTypes.func.isRequired,
  gotoHomepage: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isSoundMuted: state.app.isSoundMuted,
});

const mapDispatchToProps = dispatch => ({
  toggleSound: () => dispatch(toggleSound()),
});

export default
withStyles(styles, { useTheme: true })(connect(mapStateToProps, mapDispatchToProps)(TopAppBar));
