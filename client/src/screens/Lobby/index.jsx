/* eslint-disable max-len */

import React, { useState } from 'react';
import { connect } from 'redux';

import {

  Button,
  FormControl,
  Form,
} from 'react-bootstrap';

import { createPlayer } from '../../reducers/api';

const Lobby = ({ createPlayer }) => {

  const [playerName, setPlayerName] = useState(JSON.parse(localStorage.getItem('utl-player')));
  
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        createPlayer(playerName, (err, player) => {
          setPlayerName({ player });
        });
      }}
      inline
      className='Form_animated'
    >
      <FormControl
        type='text'
        value={playerName || ''}
        placeholder='Name'
        onChange={(e) => {
          setPlayerName({ playerName: e.target.value });
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
  createPlayer: () => {
    dispatch(createPlayer());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
