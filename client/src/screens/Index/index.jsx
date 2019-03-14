/* eslint-disable max-len */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  Button,
  FormControl,
  Form,
} from 'react-bootstrap';

import { wssCreatePlayer, displayErrorMessage } from '../../reducers/app';

const Index = ({
  createPlayer,
  player,
  displayError,
}) => {
  const utlPlayer = JSON.parse(localStorage.getItem('utl-player'));
  const [playerName, setPlayerName] = useState(utlPlayer === null ? '' : utlPlayer.name);

  if (player) {
    return <Redirect to='/lobby' />;
  }

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        const usernameRegex = /^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/;
        if (playerName && playerName.match(usernameRegex)) {
          createPlayer(playerName);
        } else {
          displayError({ message: `Le nom ${playerName} n'est pas valide !` });
        }
      }}
      inline
      className='Form_animated'
    >
      <FormControl
        type='text'
        value={playerName || ''}
        placeholder='Name'
        onChange={(e) => {
          setPlayerName(e.target.value);
        }}
      />
      <Button bsStyle='success' type='submit'>
        Ok
      </Button>
    </Form>
  );
};

Index.defaultProps = {
  player: null,
};

Index.propTypes = {
  createPlayer: PropTypes.func.isRequired,
  displayError: PropTypes.func.isRequired,

  player: PropTypes.shape({}),
  history: PropTypes.shape({}).isRequired,
};

const mapStateToProps = (state) => {
  const { isLoading, player } = state.app;
  return { isLoading, player };
};

const mapDispatchToProps = dispatch => ({
  createPlayer: (playerName) => {
    dispatch(wssCreatePlayer(playerName));
  },
  displayError: ({ message }) => {
    dispatch(displayErrorMessage(message));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Index));
