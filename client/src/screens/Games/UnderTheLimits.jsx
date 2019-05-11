import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import { InGameLayout } from '../../layouts';

import {
  Button,
  UnderTheLimits,
} from '../../components';

import { wssStartGame, wssSelectedAnswers, wssSelectJudgment } from '../../reducers/game';

const UnderTheLimitsGame = ({
  currentChannel,
  player,
  startGame,
  selectedAnswers,
  selectJudgment,
  match,
}) => {
  if (!player || !currentChannel) {
    return <Redirect to={`/?channel=${encodeURIComponent(match.params.id)}`} />;
  }

  return (
    <InGameLayout players={currentChannel.players} noScore={false} channel={currentChannel}>
      {player.name === currentChannel.admin.name
        && (currentChannel.currentStatus === 'WAITING_GAME'
          || currentChannel.currentStatus === 'IDLE') && (
          <Button
            variant='contained'
            color='secondary'
            onClick={() => {
              startGame();
            }}
          >
            {currentChannel.currentStatus === 'IDLE' ? 'Commencer la partie' : 'Prochain round'}
          </Button>
      )}
      <UnderTheLimits
        player={player}
        currentChannel={currentChannel}
        selectedAnswers={selectedAnswers}
        selectedJudgment={selectJudgment}
      />
    </InGameLayout>
  );
};

UnderTheLimitsGame.defaultProps = {
  currentChannel: null,
  player: null,
};

UnderTheLimitsGame.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,

  startGame: PropTypes.func.isRequired,
  selectedAnswers: PropTypes.func.isRequired,
  selectJudgment: PropTypes.func.isRequired,
  currentChannel: PropTypes.shape({}),
  player: PropTypes.shape({}),
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
  selectJudgment: (selectJudgmentReq) => {
    dispatch(wssSelectJudgment(selectJudgmentReq));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UnderTheLimitsGame));
