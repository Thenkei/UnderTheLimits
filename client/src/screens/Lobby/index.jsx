import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  Col,
  Button,
  Row,
  Label,
  Form,
} from 'react-bootstrap';

import CreateChannel from '../../components/CreateChannel';
import Player from '../../components/Player';

import {
  wssUpdateChannel,
  wssCreateChannel,
  wssGotoChannel,
} from '../../reducers/chanel';

import { wssUpdateLobby } from '../../reducers/lobby';

//
import './App.scss';

class Lobby extends Component {
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

  render() {
    if (this.props.currentChannel) {
      return <Redirect to={`/underthelimits/${this.props.currentChannel.id}`} />;
    }

    if (!this.props.player) {
      return <Redirect to='/' />;
    }
    if (!this.props.lobby) {
      return <p>Loading ...</p>;
    }

    return (
      <React.Fragment>
        <main>
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
                      this.props.gotoChannel(c.id);
                    }}
                  >
                    {c.name}
                  </Button>
                </Form>
              ))}
            </Col>
          </Row>
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

Lobby.defaultProps = {
  lobby: null,
  player: null,
  currentChannel: null,
};

Lobby.propTypes = {
  updateLobby: PropTypes.func.isRequired,
  updateChannel: PropTypes.func.isRequired,
  createChannel: PropTypes.func.isRequired,
  gotoChannel: PropTypes.func.isRequired,

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

const mapStateToProps = state => ({
  lobby: state.lobby,
  player: state.player,
  currentChannel: state.chanel,
});

const mapDispatchToProps = dispatch => ({
  updateLobby: () => {
    dispatch(wssUpdateLobby());
  },
  updateChannel: () => {
    dispatch(wssUpdateChannel());
  },
  createChannel: (createChannelReq) => {
    dispatch(wssCreateChannel(createChannelReq));
  },
  gotoChannel: (gotoChannelReq) => {
    dispatch(wssGotoChannel(gotoChannelReq));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Lobby));
