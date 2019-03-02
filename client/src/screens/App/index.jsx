import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Col,
  Button,
  FormControl,
  Row,
  Grid,
  Alert,
  Label,
  Form
} from 'react-bootstrap';
import {
  error,
  success,
  createPlayer,
  updateLobby,
  createChannel,
  updateChannel,
  gotoChannel,
  startGame
} from '../../services/Api';
import CreateChannel from '../../components/CreateChannel';
import UnderTheLimits from '../../components/UnderTheLimits';
import Score from '../../components/Score';
import Player from '../../components/Player';
import Particles from '../../components/Particles';
//
import './App.scss';

const DEFAULT_ERROR_TIMEOUT = 3000;
const DEFAULT_SUCCESS_TIMEOUT = 10000;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerName:
        (JSON.parse(localStorage.getItem('utl-player')) || []).name || ''
    };

    error(errMsg => {
      this.setState({
        error: errMsg
      });
      setTimeout(() => {
        this.setState({ error: '' });
      }, DEFAULT_ERROR_TIMEOUT);
    });

    success(successMsg => {
      this.setState({
        success: successMsg
      });
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

      this.setState({
        lobby
      });
    });

    updateChannel((err, channel) => {
      const me = channel.players.find(c => c.id === this.state.player.id);

      this.setState({
        player: me,
        currentChannel: channel
      });
    });

    this.onCreateChannel = this.onCreateChannel.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  onCreateChannel(channelName) {
    createChannel(channelName);
  }

  renderStep() {
    if (this.state.currentChannel) {
      return (
        <Grid>
          <Row>
            {this.state.player.name === this.state.currentChannel.admin.name &&
            (this.state.currentChannel.currentStatus === 'WAITING_GAME' ||
              this.state.currentChannel.currentStatus === 'IDLE') ? (
              <Col sm={4}>
                <Button
                  onClick={() => {
                    startGame(this.state.currentChannel.id);
                  }}
                >
                  Next round
                </Button>
              </Col>
            ) : (
              <div />
            )}

            <Col sm={4}>
              <h1>
                <Label>{this.state.currentChannel.name}</Label>
              </h1>
              <h3>
                {this.state.player.isGameMaster
                  ? `${this.state.player.name} c'est vous le patron !`
                  : `${this.state.player.name} à vous de jouer !`}
              </h3>
              <Score players={this.state.currentChannel.players} />
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
              <Player value={p} noScore />
            ))}
          </Col>
          <Col sm={4}>
            <h1>
              <Label>CHANNELS</Label>
            </h1>
            {this.state.lobby.channels.map(c => (
              <Form inline>
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
        onSubmit={e => {
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
          onChange={e => {
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
        {this.state.error ? (
          <Alert bsStyle='danger'>{this.state.error}</Alert>
        ) : (
          null
        )}
        {this.state.success ? (
          <Alert bsStyle='success'>{this.state.success}</Alert>
        ) : (
          null
        )}
        <header className='App-header'>
          <img
          src='/public/images/UTL_Logo.png'
          alt='under-the-limits'
          className='App-logo'
          />
        </header>
        <main>
          {this.renderStep()}
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
          >
            Github
          </a>
        </footer>
        {/* <Particles /> */}
      </div>
    );
  }
}

export default App;
