/* eslint-disable max-len */

import React, { useState } from 'react';
import { connect } from 'react-redux';

import {
  Button,
  FormControl,
  Form,
  ProgressBar,
} from 'react-bootstrap';

import { apiCreatePlayer } from '../../reducers/api';

const Lobby = ({ createPlayer, isLoading }) => {

  const [playerName, setPlayerName] = useState(JSON.parse(localStorage.getItem('utl-player')));
  
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        createPlayer(playerName);
      }}
      inline
      className='Form_animated'
    >
      { isLoading && <ProgressBar />}
      <FormControl
        type='text'
        value={playerName || ''}
        placeholder='Name'
        onChange={(e) => {
          setPlayerName(e.target.value);
        }}
      />
      {
        // onClick mandatory to avoid page reload.
        // Remove the line when adding react-router
      }
      <Button bsStyle='success' type='submit'>
        Ok
      </Button>
    </Form>
  )
};



const mapStateToProps = (state) => {
  const { isLoading } = state.app;
  return { isLoading };
};

const mapDispatchToProps = dispatch => ({
  createPlayer: (playerName) => {
    dispatch(apiCreatePlayer(playerName));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
