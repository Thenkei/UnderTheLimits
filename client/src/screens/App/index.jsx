import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  Col,
  Button,
  FormControl,
  Row,
  Grid,
  Alert,
  Label,
  Form,
  ProgressBar,
} from 'react-bootstrap';

import CreateChannel from '../../components/CreateChannel';
import UnderTheLimits from '../../components/UnderTheLimits';
import Score from '../../components/Score';
import Player from '../../components/Player';

import {
  error,
  success,
  createPlayer,
  updateLobby,
  createChannel,
  updateChannel,
  gotoChannel,
  startGame,
} from '../../services/Api';

import { init } from '../../reducers/app';

//
import './App.scss';

const DEFAULT_ERROR_TIMEOUT = 3000;
const DEFAULT_SUCCESS_TIMEOUT = 10000;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerName:
        (JSON.parse(localStorage.getItem('utl-player')) || []).name || '',
    };

    error((errMsg) => {
      this.setState({ error: errMsg });
      setTimeout(() => {
        this.setState({ error: '' });
      }, DEFAULT_ERROR_TIMEOUT);
    });

    success((successMsg) => {
      this.setState({ success: successMsg });
      setTimeout(() => {
        this.setState({ success: '' });
      }, DEFAULT_SUCCESS_TIMEOUT);
    });

    updateLobby((err, responseLobby) => {
      const lobby = { waitingPlayers: [], channels: [] };

      if (this.state.lobby) {
        if (this.state.lobby.waitingPlayers) {
          lobby.waitingPlayers = this.state.lobby.waitingPlayers;
        }
        if (this.state.lobby.channels) {
          lobby.channels = this.state.lobby.channels;
        }
      }
      if (responseLobby.channels) {
        lobby.channels = responseLobby.channels;
      }
      if (responseLobby.waitingPlayers) {
        lobby.waitingPlayers = responseLobby.waitingPlayers;
      }

      this.setState({ lobby });
    });

    updateChannel((err, channel) => {
      const me = channel.players.find(c => c.id === this.state.player.id);

      this.setState({
        player: me,
        currentChannel: channel,
      });
    });
  }

  componentDidMount() {
    this.props.init();
  }

  onCreateChannel = (channelName) => {
    createChannel(channelName);
  }

  renderStep() {
    if (this.state.currentChannel) {
      return (
        <Grid>
          <Row>
            <Col sm={{ span: 4, offset: 4 }}>
              <h1>
                <Label>{this.state.currentChannel.name}</Label>
              </h1>
              <h3>
                {this.state.player.name}
                {this.state.player.isGameMaster ? ' c\'est vous le patron !' : ' à vous de jouer !'}
              </h3>
              <Score players={this.state.currentChannel.players} />
              {this.state.player.name === this.state.currentChannel.admin.name
              && (this.state.currentChannel.currentStatus === 'WAITING_GAME'
                || this.state.currentChannel.currentStatus === 'IDLE') && (
                  <Button
                    style={{ marginBottom: '20px' }}
                    onClick={() => {
                      startGame();
                    }}
                  >
                    Next round
                  </Button>
              )}
            </Col>
          </Row>
          <Row>
            <UnderTheLimits
              player={this.state.player}
              currentChannel={this.state.currentChannel}
            />
          </Row>
        </Grid>
      );
    }
    if (this.state.lobby && this.state.player) {
      return (
        <Row>
          <Col sm={4}>
            <CreateChannel onCreateChannel={this.onCreateChannel} />
          </Col>
          <Col sm={4}>
            <h1>
              <Label>PLAYERS</Label>
            </h1>
            {this.state.lobby.waitingPlayers.map(p => (
              <Player key={p.id} value={p} noScore />
            ))}
          </Col>
          <Col sm={4}>
            <h1>
              <Label>CHANNELS</Label>
            </h1>
            {this.state.lobby.channels.map(c => (
              <Form key={c.id} inline>
                <Button
                  onClick={() => {
                    gotoChannel(c.id, (err, channel) => {
                      this.setState({ currentChannel: channel });
                    });
                  }}
                >
                  {c.name}
                </Button>
              </Form>
            ))}
          </Col>
        </Row>
      );
    }
    return (
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          createPlayer(this.state.playerName, (err, player) => {
            localStorage.setItem('utl-player', JSON.stringify(player));
            this.setState({ player });
          });
        }}
        inline
        className='Form_animated'
      >
        <FormControl
          type='text'
          value={this.state.playerName || ''}
          placeholder='Name'
          onChange={(e) => {
            this.setState({ playerName: e.target.value });
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
    );
  }

  render() {
    return (
      <div className='App'>
        {this.state.error && <Alert bsStyle='danger'>{this.state.error}</Alert>}
        {this.state.success && <Alert bsStyle='success'>{this.state.success}</Alert>}
        <header className='App-header'>
          <img
            src='/public/images/UTL_Logo.png'
            alt='under-the-limits'
            className='App-logo'
          />
        </header>
        <main>
          {this.renderStep()}
          {this.props.isLoading && <ProgressBar style={{ width: '50%', display: 'inline-block' }} striped animated='true' now={90} />}
        </main>
        <footer className='App-footer'>
          <Link
            className='App-legalLink'
            to='/mentions-legales'
          >
            Mention légales
          </Link>
          <a
            className='App-legalLink'
            href='https://github.com/Thenkei/UnderTheLimits'
            target='_blank'
            rel='noopener noreferrer'
          >
            Github
          </a>
        </footer>
      </div>
    );
  }
}

App.propTypes = {
  init: PropTypes.func.isRequired,

  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const { isLoading } = state.app;
  return { isLoading };
};

const mapDispatchToProps = dispatch => ({
  init: () => {
    dispatch(init());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
