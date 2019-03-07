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
  gotoChannel,
  startGame,
} from '../../services/Api';

import {
  wssUpdateLobby,
  wssUpdateChannel,
  wssCreateChannel,
} from '../../reducers/app';

//
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.updateLobby();
    this.props.updateChannel();
  }

  onCreateChannel = (channelName) => {
    this.props.createChannel(channelName);
  }

  renderStep() {
    if (this.props.currentChannel) {
      return (
        <Grid>
          <Row>
            <Col sm={{ span: 4, offset: 4 }}>
              <h1>
                <Label>{this.props.currentChannel.name}</Label>
              </h1>
              <h3>
                {this.props.player.name}
                {this.props.player.isGameMaster ? ' c\'est vous le patron !' : ' à vous de jouer !'}
              </h3>
              <Score players={this.props.currentChannel.players} />
              {this.props.player.name === this.props.currentChannel.admin.name
              && (this.props.currentChannel.currentStatus === 'WAITING_GAME'
                || this.props.currentChannel.currentStatus === 'IDLE') && (
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
              player={this.props.player}
              currentChannel={this.props.currentChannel}
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
                    gotoChannel(c.id, (/* err, channel */) => {
                      // this.setState({ currentChannel: channel });
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
  currentChannel: null,
};

App.propTypes = {
  updateLobby: PropTypes.func.isRequired,
  updateChannel: PropTypes.func.isRequired,
  createChannel: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,

  currentChannel: PropTypes.shape({
    players: PropTypes.shape({}),
    name: PropTypes.string,
    id: PropTypes.string,
    currentStatus: PropTypes.string,
    admin: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
  lobby: PropTypes.shape({
    channels: PropTypes.arrayOf(PropTypes.shape({})),
    waitingPlayers: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  player: PropTypes.shape({
    isGameMaster: PropTypes.bool,
    name: PropTypes.string,
  }),
};

const mapStateToProps = (state) => {
  const { isLoading, lobby, player } = state.app;
  return { isLoading, lobby, player };
};

const mapDispatchToProps = dispatch => ({
  updateLobby: () => {
    dispatch(wssUpdateLobby());
  },
  updateChannel: (meId) => {
    dispatch(wssUpdateChannel(meId));
  },
  createChannel: (createChannelReq) => {
    dispatch(wssCreateChannel(createChannelReq));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
