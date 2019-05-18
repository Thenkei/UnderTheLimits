/* eslint-disable max-len */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  Icon,
  IconButton,
  Input,
  Button,
  withStyles,
} from '../../components';

import styles from './styles';

import { displayErrorMessage } from '../../reducers/app';
import { wssCreatePlayer } from '../../reducers/player';

import RUN from '../../utils/randomUsernameGenerator';

const Index = ({
  classes, createPlayer, player, displayError, location,
}) => {
  const utlPlayer = JSON.parse(localStorage.getItem('utl-player'));
  const [playerName, setPlayerName] = useState(
    utlPlayer === null ? '' : utlPlayer.name,
  );
  const submit = (e) => {
    e.preventDefault();
    const usernameRegex = /^([a-zA-Z]|[à-ú]|[À-Ú]|-|_)+$/;
    if (playerName && playerName.match(usernameRegex)) {
      createPlayer(playerName);
    } else {
      displayError({
        message: `Le nom ${playerName} n'est pas valide !`,
      });
    }
  };

  if (player) {
    let to = '/lobby';
    if (location.search) {
      to += location.search;
    }
    return <Redirect to={to} />;
  }

  return (
    <div className={classes.UTLLogoWrapper}>
      <div style={{ width: '100%', padding: '0 12px' }}>
        <img
          src='/public/images/UTL-Logo_splashScreen.svg'
          alt='under-the-limits'
          className={classes.UTLLogo}
        />
        <div className={classes.LoginFormWrapper}>
          <form
            onSubmit={submit}
            className={classes.LoginFormAnimated}
          >
            <Input
              type='text'
              value={playerName || ''}
              placeholder='Surnom'
              onChange={(e) => {
                setPlayerName(e.target.value);
              }}
              onKeyPress={(ev) => {
                if (ev.key === 'Enter') {
                  submit(ev);
                }
              }}
            />
            <IconButton
              variant='contained'
              color='primary'
              onClick={() => {
                setPlayerName(RUN());
              }}
            >
              <Icon>refresh</Icon>
            </IconButton>
            <Button variant='contained' color='primary' type='submit'>
              Ok
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

Index.defaultProps = {
  player: null,
};

Index.propTypes = {
  classes: PropTypes.object.isRequired,

  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,

  createPlayer: PropTypes.func.isRequired,
  displayError: PropTypes.func.isRequired,

  player: PropTypes.shape({}),
  history: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  player: state.player,
});

const mapDispatchToProps = dispatch => ({
  createPlayer: (playerName) => {
    dispatch(wssCreatePlayer(playerName));
  },
  displayError: ({ message }) => {
    dispatch(displayErrorMessage(message));
  },
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(styles, { withTheme: true })(Index)),
);
