/* eslint-disable max-len */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  Button,
  FormControl,
  Form,
  ProgressBar,
} from 'react-bootstrap';

// import {
//   wssUpdateLobby,
// } from '../../reducers/app';

import { wssCreatePlayer } from '../../reducers/app';

// const DEFAULT_ERROR_TIMEOUT = 3000;
// const DEFAULT_SUCCESS_TIMEOUT = 10000;

const Index = ({ createPlayer, isLoading, history }) => {
  const [playerName, setPlayerName] = useState(JSON.parse(localStorage.getItem('utl-player')));

  // error((errMsg) => {
  //   this.setState({ error: errMsg });
  //   setTimeout(() => {
  //     this.setState({ error: '' });
  //   }, DEFAULT_ERROR_TIMEOUT);
  // });

  // success((successMsg) => {
  //   this.setState({ success: successMsg });
  //   setTimeout(() => {
  //     this.setState({ success: '' });
  //   }, DEFAULT_SUCCESS_TIMEOUT);
  // });

  // updateLobby((err, responseLobby) => {
  //   const lobby = { waitingPlayers: [], channels: [] };

  //   if (this.state.lobby) {
  //     if (this.state.lobby.waitingPlayers) {
  //       lobby.waitingPlayers = this.state.lobby.waitingPlayers;
  //     }
  //     if (this.state.lobby.channels) {
  //       lobby.channels = this.state.lobby.channels;
  //     }
  //   }
  //   if (responseLobby.channels) {
  //     lobby.channels = responseLobby.channels;
  //   }
  //   if (responseLobby.waitingPlayers) {
  //     lobby.waitingPlayers = responseLobby.waitingPlayers;
  //   }

  //   this.setState({ lobby });
  // });

  return (
    <div className='App'>
      {/* {this.state.error && <Alert bsStyle='danger'>{this.state.error}</Alert>}
      {this.state.success && <Alert bsStyle='success'>{this.state.success}</Alert>} */}
      <header className='App-header'>
        <img
          src='/public/images/UTL_Logo.png'
          alt='under-the-limits'
          className='App-logo'
        />
      </header>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          createPlayer(playerName);
          history.push('/lobby');
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
    </div>
  );
};

Index.defaultProps = {
  isLoading: false,
};

Index.propTypes = {
  createPlayer: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,

  history: PropTypes.shape({}).isRequired,
};

const mapStateToProps = (state) => {
  const { isLoading } = state.app;
  return { isLoading };
};

const mapDispatchToProps = dispatch => ({
  createPlayer: (playerName) => {
    dispatch(wssCreatePlayer(playerName));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Index));
