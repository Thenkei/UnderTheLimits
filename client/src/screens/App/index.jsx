import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  Col,
  Button,
  Row,
  Grid,
  Label,
  Form,
  ProgressBar,
} from 'react-bootstrap';

import CreateChannel from '../../components/CreateChannel';
import UnderTheLimits from '../../components/UnderTheLimits';
import Score from '../../components/Score';
import Player from '../../components/Player';

import {
  createChannel,
  updateChannel,
  gotoChannel,
  startGame,
} from '../../services/Api';

import { wssUpdateLobby } from '../../reducers/app';

//
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.updateLobby();

    updateChannel((err, channel) => {
      const me = channel.players.find(c => c.id === this.state.player.id);

      this.setState({
        player: me,
        currentChannel: channel,
      });
    });
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
    if (this.props.lobby && this.props.player) {
      return (
        <Row>
          <Col sm={4}>
            <CreateChannel onCreateChannel={this.onCreateChannel} />
          </Col>
          <Col sm={4}>
            <h1>
              <Label>PLAYERS</Label>
            </h1>
            {this.props.lobby.waitingPlayers.map(p => (
              <Player key={p.id} value={p} noScore />
            ))}
          </Col>
          <Col sm={4}>
            <h1>
              <Label>CHANNELS</Label>
            </h1>
            {this.props.lobby.channels.map(c => (
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
    return <p>Waiting ...</p>;
  }

  render() {
    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  }
}

App.defaultProps = {
  lobby: null,
  player: null,
};

App.propTypes = {
  updateLobby: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,

  lobby: PropTypes.shape({
    channels: PropTypes.arrayOf(PropTypes.shape({})),
    waitingPlayers: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  player: PropTypes.shape({}),
};

const mapStateToProps = (state) => {
  const { isLoading, lobby, player } = state.app;
  console.warn(lobby, player);
  return { isLoading, lobby, player };
};

const mapDispatchToProps = dispatch => ({
  updateLobby: () => {
    dispatch(wssUpdateLobby());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
