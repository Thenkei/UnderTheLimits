import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import { InGameLayout } from '../../layouts';

import {
  Button,
  Icon,
  IconButton,
  UnderTheLimits,
  Typography,
  Tooltip,
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
      <Typography variant='h4'>{currentChannel.name}</Typography>
      <Typography variant='h5'>
        {player.name}
        {player.isGameMaster ? ' c\'est vous le patron !' : ' à vous de jouer !'}
      </Typography>
      {player.name === currentChannel.admin.name
        && (currentChannel.currentStatus === 'WAITING_GAME'
          || currentChannel.currentStatus === 'IDLE') && (
          <Button
            variant='contained'
            color='primary'
            style={{ marginBottom: '20px' }}
            onClick={() => {
              startGame();
            }}
          >
            {currentChannel.currentStatus === 'IDLE' ? 'Commencer la partie' : 'Prochain round'}
          </Button>
      )}
      <Tooltip title='Copier le lien de la partie'>
        <IconButton
          onClick={() => {
            const el = document.createElement('textarea');
            el.value = window.location;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
          }}
        >
          <Icon>
            file_copy
          </Icon>
        </IconButton>
      </Tooltip>
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
