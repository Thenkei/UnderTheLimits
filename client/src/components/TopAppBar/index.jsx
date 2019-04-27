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
  Menu,
  Tooltip,
  withStyles,
  Typography,
  LinearProgress,
  MenuItem,
  ListItemIcon,
  ListItemText,
  MoreVertIcon,
} from '..';

import Legals from './Legals';

import { toggleSound } from '../../reducers/app';

import styles from './styles';

const TopAppBar = (props) => {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDialog, setSelectedDialog] = useState(null);

  const generateText = () => {
    let text = 'En attente...';
    switch (props.channel.currentStatus) {
      case 'PLAYING_CARD':
        if (!props.player.isGameMaster) {
          text = `${props.player.username} à vous de jouer`;
        } else {
          text = 'C\'est vous le patron !';
        }
        break;

      case 'JUDGING_CARD':
        if (props.player.isGameMaster) {
          text = `${props.player.username} à vous de juger`;
        } else {
          text = 'C\'est l\'heure du jugement !';
        }
        break;

      default:
    }
    return text;
  };

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
      {props.channel && (
        <React.Fragment>
          <div>
            <Typography variant='h3'>{generateText()}</Typography>
          </div>
          {props.channel.currentStatus === 'PLAYING_CARD' && (
            <React.Fragment>
              <LinearProgress style={{ width: '200px' }} variant='buffer' value={0} valueBuffer={(props.channel.timer * 2)} />
              <Typography variant='h5'>{`${props.channel.timer}s`}</Typography>
            </React.Fragment>
          )}
          <div>
            <Typography variant='h5'>Channel</Typography>
            <Typography variant='h3'>{props.channel.name}</Typography>
          </div>
        </React.Fragment>
      )}
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
        <IconButton
          onClick={(e) => {
            setAnchorEl(e.currentTarget);
            setMenuOpen(true);
          }}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
        >
          <MenuItem disabled={!props.channel}>
            <ListItemIcon>
              <Icon>
                file_copy
              </Icon>
            </ListItemIcon>
            <ListItemText>
              Copier le lien de la partie
            </ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setSelectedDialog('legals');
              setOpen(true);
              setMenuOpen(false);
            }}
          >
            <ListItemIcon>
              <Icon>
                info
              </Icon>
            </ListItemIcon>
            <ListItemText>
              A propos...
            </ListItemText>
          </MenuItem>
          <MenuItem
            component='a'
            href='https://github.com/Thenkei/UnderTheLimits'
            target='_blank'
            onClick={() => {
              setMenuOpen(false);
            }}
          >
            <ListItemIcon>
              <Icon>
                code
              </Icon>
            </ListItemIcon>
            <ListItemText>
              Lien github
            </ListItemText>
          </MenuItem>
        </Menu>
      </div>
    </header>
  );
};

TopAppBar.defaultProps = {
  channel: null,
  player: null,
};

TopAppBar.propTypes = {
  classes: PropTypes.object.isRequired,

  isSoundMuted: PropTypes.bool.isRequired,
  channel: PropTypes.object,
  player: PropTypes.object,

  toggleSound: PropTypes.func.isRequired,
  gotoHomepage: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isSoundMuted: state.app.isSoundMuted,
  channel: state.channel,
  player: state.player,
});

const mapDispatchToProps = dispatch => ({
  toggleSound: () => dispatch(toggleSound()),
});

export default
withStyles(styles, { useTheme: true })(connect(mapStateToProps, mapDispatchToProps)(TopAppBar));
