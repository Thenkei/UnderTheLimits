import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  Col,
  Button,
  Row,
  Grid,
  Label,
} from 'react-bootstrap';

import UnderTheLimits from '../../components/UnderTheLimits';
import Score from '../../components/Score';

import { wssStartGame, wssSelectedAnswers, wssSelectJudgment } from '../../reducers/app';

const UnderTheLimitsGame = ({
  currentChannel,
  player,
  startGame,
  selectedAnswers,
  selectJudgment,
}) => (
  <Grid>
    <Row>
      <Col sm={{ span: 4, offset: 4 }}>
        <h1>
          <Label>{currentChannel.name}</Label>
        </h1>
        <h3>
          {player.name}
          {player.isGameMaster ? ' c\'est vous le patron !' : ' à vous de jouer !'}
        </h3>
        <Score players={currentChannel.players} />
        {player.name === currentChannel.admin.name
          && (currentChannel.currentStatus === 'WAITING_GAME'
            || currentChannel.currentStatus === 'IDLE') && (
            <Button
              style={{ marginBottom: '20px' }}
              onClick={() => {
                startGame();
              }}
            >
              {currentChannel.currentStatus === 'IDLE' ? 'Commencer la partie' : 'Prochain round'}
            </Button>
        )}
      </Col>
    </Row>
    <Row>
      <UnderTheLimits
        player={player}
        currentChannel={currentChannel}
        selectedAnswers={selectedAnswers}
        selectedJudgment={selectJudgment}
      />
    </Row>
  </Grid>
);

UnderTheLimitsGame.defaultProps = {
  currentChannel: null,
  player: null,
};

UnderTheLimitsGame.propTypes = {
  startGame: PropTypes.func.isRequired,
  selectedAnswers: PropTypes.func.isRequired,
  selectJudgment: PropTypes.func.isRequired,

  currentChannel: PropTypes.shape({}),
  player: PropTypes.shape({}),
};

const mapStateToProps = (state) => {
  const {
    isLoading,
    player,
    currentChannel,
  } = state.app;

  return {
    isLoading,
    player,
    currentChannel,
  };
};

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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UnderTheLimitsGame));
