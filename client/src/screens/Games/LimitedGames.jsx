import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import { InGameLayout } from '../../layouts';

import {
  LimitedGames,
} from '../../components';

import { wssStartGame, wssSelectedAnswers } from '../../reducers/game';

const LimitedGamesGame = ({
  currentChannel,
  player,
  startGame,
  selectedAnswers,
  match,
}) => {
  if (!player || !currentChannel) {
    return <Redirect to={`/?channel=${encodeURIComponent(match.params.id)}`} />;
  }

  return (
    <InGameLayout players={currentChannel.players} noScore={false} channel={currentChannel}>
      <LimitedGames.Header
        isAdmin={player.name === currentChannel.admin.name}
        gameStatus={currentChannel.currentStatus}
        headerAction={startGame}
      />
      <LimitedGames
        player={player}
        currentChannel={currentChannel}
        selectedAnswers={selectedAnswers}
      />
    </InGameLayout>
  );
};

LimitedGamesGame.defaultProps = {
  currentChannel: null,
  player: null,
};

LimitedGamesGame.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,

  startGame: PropTypes.func.isRequired,
  selectedAnswers: PropTypes.func.isRequired,
  currentChannel: PropTypes.shape({
    players: PropTypes.object,
    currentStatus: PropTypes.string,
    admin: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
  player: PropTypes.shape({
    name: PropTypes.string,
  }),
};

const mapStateToProps = state => ({
  player: state.player,
  currentChannel: state.channel,
});

const mapDispatchToProps = dispatch => ({
  startGame: () => {
    dispatch(wssStartGame());
  },
  selectedAnswers: (selectedAnswerReq) => {
    dispatch(wssSelectedAnswers(selectedAnswerReq));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LimitedGamesGame));
