/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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

const copyToClipboard = (el) => {
  const range = document.createRange();
  const selection = document.getSelection();

  const mark = document.createElement('span');
  mark.textContent = window.location.href;
  mark.style.webkitUserSelect = 'text';
  mark.style.MozUserSelect = 'text';
  mark.style.msUserSelect = 'text';
  mark.style.userSelect = 'text';

  el.appendChild(mark);

  range.selectNodeContents(mark);
  selection.removeAllRanges();
  selection.addRange(range);

  document.execCommand('copy');
  el.removeChild(mark);
};

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
    <header
      className={classNames(
        props.classes.topAppBar,
        { [props.classes.homePage]: !props.player },
      )}
    >
      {props.player && (
        <img
          src='/public/images/UTL-Logo_topAppBar.png'
          alt='under-the-limits'
          className={props.classes.topAppBarLogo}
          onClick={() => {
            if (window.location.pathname !== '/') {
              setSelectedDialog('quit');
              setOpen(true);
            }
          }}
        />
      )}
      {props.channel && (
        <div className={props.classes.channelInfosContainer}>
          <Typography className={props.classes.channelMainInfo} key={props.channel.currentStatus} variant='h6'>{generateText()}</Typography>
          <div className={props.classes.channelSecondaryInfos}>
            {props.channel.currentStatus === 'PLAYING_CARD' && (
              <React.Fragment>
                <Typography variant='h4' className={props.classes.timerText}>{props.channel.timer}</Typography>
                <Typography variant='h6' className={props.classes.timerTextUnit}>s</Typography>
                <Typography variant='h6' className={props.classes.timerTextSeparator}>/</Typography>
              </React.Fragment>
            )}
            <div className={props.classes.channelNameContainer}>
              <Typography className={props.classes.channelNameOverline} variant='overline'>Channel</Typography>
              <Typography className={props.classes.channelName} variant='h5'>{props.channel.name}</Typography>
            </div>
          </div>
        </div>
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
          <MenuItem
            disabled={!props.channel}
            onClick={() => {
              copyToClipboard(anchorEl);
              setMenuOpen(false);
            }}
          >
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
      {props.channel && props.channel.currentStatus === 'PLAYING_CARD' && (
        <LinearProgress
          className={props.classes.timerProgress}
          classes={{
            bar: props.classes.timerProgressBar,
            dashed: props.classes.timerProgressDashed,
          }}
          color='secondary'
          variant='buffer'
          value={0}
          valueBuffer={(props.channel.timer * 2)}
        />
      )}
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
  gotoHomepage: PropTypes.func.isRequired,
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
