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

import Legals from './Legals';

import { toggleSound } from '../../reducers/app';

import styles from './styles';

const TopAppBar = (props) => {
  const [open, setOpen] = useState(false);
  const [selectedDialog, setSelectedDialog] = useState(null);
  return (
    <header className={props.classes.topAppBar}>
      <img
        src='/public/images/UTL_Logo.png'
        alt='under-the-limits'
        className={props.classes.topAppBarLogo}
        onClick={() => {
          setSelectedDialog('quit');
          setOpen(true);
        }}
      />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>
          {
            selectedDialog === 'quit'
              ? 'Êtes vous sur de vouloir quitter ?'
              : <Legals />
          }
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Fermer</Button>
          {selectedDialog === 'quit' && (
            <Button
              onClick={() => {
                props.gotoHomepage();
                setOpen(false);
                window.location.reload();
              }}
            >
              Ok
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <div className={props.classes.topAppBarButtonContainer}>
        <Tooltip title={props.isSoundMuted ? 'Activer' : 'Désactiver'}>
          <IconButton className={props.classes.muteButton} onClick={props.toggleSound}>
            <Icon
              className={
                props.isSoundMuted ? props.classes.soundMutted : props.classes.soundActivated
              }
            >
              volume_up
            </Icon>
          </IconButton>
        </Tooltip>
        <Tooltip title='A propos...'>
          <IconButton
            onClick={() => {
              setSelectedDialog('legals');
              setOpen(true);
            }}
            className={props.classes.topAppBarIconButton}
          >
            <Icon>info</Icon>
          </IconButton>
        </Tooltip>
        <Tooltip title='Lien github'>
          <IconButton
            href='https://github.com/Thenkei/UnderTheLimits'
            target='_blank'
            className={props.classes.topAppBarIconButton}
          >
            <Icon>code</Icon>
          </IconButton>
        </Tooltip>
      </div>
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
