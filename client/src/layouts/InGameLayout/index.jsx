import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { List } from 'immutable';

import { Chat, Players } from '../../components';

import {
  wssSendMessage,
  wssChatMessages,
} from '../../reducers/chat';

import './style.scss';

class InGameLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.chatMessages();
  }

  render() {
    return (
      <div className='InGameLayout'>
        <div className='ScoreBoard'>
          <div className='ScoreBoard-topBar'>Liste des joueurs</div>
          <Players players={this.props.players} noScore={this.props.noScore} />
        </div>
        <main className='IngameLayout-mainContent'>
          { this.props.children }
        </main>
        <Chat
          username={this.props.username}
          messages={this.props.messages}
          sendMessage={this.props.sendMessage}
        />
      </div>
    );
  }
}

InGameLayout.defaultProps = {
  players: [],
  noScore: true,
};

InGameLayout.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  chatMessages: PropTypes.func.isRequired,
  messages: PropTypes.instanceOf(List).isRequired,
  children: PropTypes.arrayOf(PropTypes.any).isRequired,
  username: PropTypes.string.isRequired,

  players: PropTypes.arrayOf(PropTypes.object),
  noScore: PropTypes.bool,
};

const mapStateToProps = state => ({
  messages: state.chat.messages,
  username: state.player.username,
});

const mapDispatchToProps = dispatch => ({
  chatMessages: () => {
    dispatch(wssChatMessages());
  },
  sendMessage: (msg) => {
    dispatch(wssSendMessage(msg));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InGameLayout));
