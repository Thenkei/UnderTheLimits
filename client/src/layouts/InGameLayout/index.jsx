import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { List } from 'immutable';

import { Chat } from '../../components';

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
        <div className='ScoreBoard'>BLBLBLB</div>
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
InGameLayout.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  chatMessages: PropTypes.func.isRequired,
  messages: PropTypes.instanceOf(List).isRequired,
  children: PropTypes.shape({}).isRequired,
  username: PropTypes.string.isRequired,
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
