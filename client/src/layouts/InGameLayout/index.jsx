import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { List } from 'immutable';
import classNames from 'classnames';

import {
  Chat,
  Players,
  withStyles,
} from '../../components';

import {
  wssSendMessage,
  wssChatMessages,
} from '../../reducers/chat';

import styles from './styles';

class InGameLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.chatMessages();
  }

  render() {
    const {
      classes,
      players,
      noScore,
      channel,
      username,
      messages,
      sendMessage,
      children,
    } = this.props;
    return (
      <div className={classes.inGameLayout}>
        <div className={classNames(classes.sideBars, classes.scoreBoard)}>
          <Players players={players} noScore={noScore} channel={channel} />
        </div>
        <main className={classes.ingameLayoutMainContent}>
          { children }
        </main>
        <div className={classNames(classes.sideBars, classes.chat)}>
          <Chat
            username={username}
            messages={messages}
            sendMessage={sendMessage}
          />
        </div>
      </div>
    );
  }
}

InGameLayout.defaultProps = {
  players: [],
  noScore: true,

  channel: null,
};

InGameLayout.propTypes = {
  classes: PropTypes.object.isRequired,

  sendMessage: PropTypes.func.isRequired,
  chatMessages: PropTypes.func.isRequired,
  messages: PropTypes.instanceOf(List).isRequired,
  children: PropTypes.arrayOf(PropTypes.any).isRequired,
  username: PropTypes.string.isRequired,

  players: PropTypes.arrayOf(PropTypes.object),
  noScore: PropTypes.bool,
  channel: PropTypes.object,
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

export default
withStyles(styles, {
  useTheme: true,
})(withRouter(connect(mapStateToProps, mapDispatchToProps)(InGameLayout)));
