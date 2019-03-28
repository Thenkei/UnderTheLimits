import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import { List } from 'immutable';

import {
  Col,
  Button,
  Row,
  Container,
  Badge,
} from 'react-bootstrap';

import {
  UnderTheLimits,
  Score,
  Chat,
} from '../../components';

import { wssStartGame, wssSelectedAnswers, wssSelectJudgment } from '../../reducers/game';

import {
  wssSendMessage,
  wssChatMessages,
} from '../../reducers/chat';

const UnderTheLimitsGame = ({
  currentChannel,
  player,
  startGame,
  selectedAnswers,
  selectJudgment,
  messages,
  sendMessage,
  match,
}) => {
  if (!player || !currentChannel) {
    return <Redirect to={`/?channel=${encodeURIComponent(match.params.id)}`} />;
  }

  return (
    <Container>
      <Row>
        <Col sm={{ span: 4, offset: 4 }}>
          <h1>
            <Badge>{currentChannel.name}</Badge>
            <Chat messages={messages} sendMessage={sendMessage} />
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
    </Container>
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
  sendMessage: PropTypes.func.isRequired,
  messages: PropTypes.instanceOf(List).isRequired,
  currentChannel: PropTypes.shape({}),
  player: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  player: state.player,
  currentChannel: state.channel,
  messages: state.chat.messages,
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
  chatMessages: () => {
    dispatch(wssChatMessages());
  },
  sendMessage: (msg) => {
    dispatch(wssSendMessage(msg));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UnderTheLimitsGame));
