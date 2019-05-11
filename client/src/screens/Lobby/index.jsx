import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { InGameLayout } from '../../layouts';

import {
  CreateChannel,
  Icon,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  withStyles,
} from '../../components';

import {
  wssUpdateChannel,
  wssCreateChannel,
  wssGotoChannel,
} from '../../reducers/channel';

import { displayErrorMessage } from '../../reducers/app';

import { wssUpdateLobby } from '../../reducers/lobby';

import QueryParser from '../../utils/queryParser';

import styles from './styles';

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.params = QueryParser.parse(this.props.location.search);
  }

  componentDidMount() {
    this.props.updateLobby();
    this.props.updateChannel();
  }

  componentDidUpdate() {
    if (this.params.channel && this.props.lobby && !this.props.currentChannel) {
      this.props.gotoChannel(this.params.channel);
    }
  }

  onCreateChannel = ({ channel }) => {
    this.props.createChannel(channel);
  }


  render() {
    const { classes } = this.props;

    if (!this.props.player) {
      return <Redirect to='/' />;
    }

    if (!this.props.lobby) {
      return <Typography>Loading ...</Typography>;
    }

    if (this.props.currentChannel) {
      return <Redirect to={`/underthelimits/${this.props.currentChannel.id}`} />;
    }
    return (
      <InGameLayout players={this.props.lobby.waitingPlayers} isLobby>
        <div className={classes.listHeader}>
          <Typography variant='h3'>Parties publiques</Typography>
          <CreateChannel
            onCreateChannel={this.onCreateChannel}
            displayError={this.props.displayError}
          />
        </div>
        <List component='nav' className={classes.channelList}>
          {this.props.lobby.channels.map(c => (
            <ListItem
              button
              key={c.id}
              onClick={() => {
                this.props.gotoChannel(c.id);
              }}
              className={classes.channelListItem}
            >
              <ListItemText
                primary={(
                  <Typography variant='h6' className={classes.channelListItemName}>
                    <Icon className={classes.channelListItemIcon}>
                      whatshot
                    </Icon>
                    {c.name}
                  </Typography>
                )}
              />
              <ListItemSecondaryAction className={classes.channelListItemSecondary}>
                <Icon className={classes.channelListItemSecondaryIcon} color='inherit'>
                  group
                </Icon>
                <Typography variant='caption'>
                  {c.playersCount}
                  /
                  {c.maxPlayersCount}
                </Typography>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </InGameLayout>
    );
  }
}

Lobby.defaultProps = {
  lobby: null,
  player: null,
  currentChannel: null,
};

Lobby.propTypes = {
  classes: PropTypes.object.isRequired,

  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,

  updateLobby: PropTypes.func.isRequired,
  updateChannel: PropTypes.func.isRequired,
  createChannel: PropTypes.func.isRequired,
  gotoChannel: PropTypes.func.isRequired,
  displayError: PropTypes.func.isRequired,

  currentChannel: PropTypes.shape({
    players: PropTypes.array,
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
  currentChannel: state.channel,
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
  displayError: ({ message }) => {
    dispatch(displayErrorMessage(message));
  },
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(styles, { withTheme: true })(Lobby)),
);
