import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Row } from 'react-bootstrap';
import Card from '../Card';

import './UnderTheLimits.scss';

function DisplayTimer(prop) {
  return (
    <h3>
      Il reste
      {` ${prop.timer}s`}
    </h3>
  );
}

function DisplayIdle() {
  return <h3>En attente..</h3>;
}

class UnderTheLimits extends Component {
  constructor(props) {
    super(props);

    this.state = {
      answerSelectNum: 1,
    };
  }

  componentDidUpdate(prevProps) {
    const currentDeckQuestion = this.props.currentChannel.deckQuestion.text;
    const prevDeckQuestion = prevProps.currentChannel.deckQuestion.text;
    if (currentDeckQuestion !== prevDeckQuestion) {
      const occurences = (currentDeckQuestion.match(/______/g) || []).length;
      // eslint-disable-next-line
      this.setState({ answerSelectNum: occurences });
    }
  }

  getFilledQuestionText(keys, values) {
    let questionText = this.props.currentChannel.deckQuestion.text;
    keys.map(
      // eslint-disable-next-line no-return-assign
      i => (questionText = questionText.replace('______', values[i].text)),
    );
    return questionText;
  }

  handleChange = (i) => {
    const index = this.props.player.answers.indexOf(i);
    if (index < 0) {
      if (this.props.player.answers.length >= this.state.answerSelectNum) {
        // eslint-disable-next-line
        console.warn(
          'Vous ne pouvez pas jouer davantage de réponses pour cette question !',
        ); // TODO Change with <Alert color='primary'>
      } else {
        this.props.player.answers.push(i);
      }
    } else {
      this.props.player.answers.splice(index, 1);
    }

    this.props.selectedAnswers(this.props.player.answers);
  };

  render() {
    if (this.props.player && this.props.player.hand) {
      if (this.props.currentChannel.currentStatus === 'JUDGING_CARD') {
        const playersShuffle = this.props.currentChannel.players.slice();
        for (let i = playersShuffle.length - 1; i > 0; i -= 1) {
          const j = Math.floor(Math.random() * (i + 1));
          [playersShuffle[i], playersShuffle[j]] = [
            playersShuffle[j],
            playersShuffle[i],
          ];
        }

        return (
          <Row className='CardsContainer CardsContainer_question'>
            {playersShuffle.map((player) => {
              if (!player.isGameMaster) {
                return (
                  <Card
                    key={`p${player.id}`}
                    value={this.getFilledQuestionText(
                      player.answers,
                      player.hand,
                    )}
                    onClick={
                      this.props.player.isGameMaster
                        ? () => this.props.selectedJudgment(
                          player.id,
                        )
                        : () => {}
                    }
                  />
                );
              }
              return null;
            })}
          </Row>
        );
      }
      if (this.props.currentChannel.currentStatus === 'WAITING_GAME') {
        const player = this.props.currentChannel.players.find(
          p => p.isGameMaster,
        );

        return (
          <React.Fragment>
            <Row>
              <p>
                Le gagnant de la manche est
                {`${player.name}:`}
              </p>
            </Row>
            <Row className='CardsContainer CardsContainer_question'>
              {
                <Card
                  key={`p${player.id}`}
                  value={this.getFilledQuestionText(
                    player.answers,
                    player.hand,
                  )}
                  onClick={() => {}}
                />
              }
            </Row>
            <Row className='CardsContainer CardsContainer_answers'>
              {this.props.player.hand.map(answer => (
                <Card
                  key={answer.text}
                  value={answer.text}
                  definition={answer.definition}
                  onClick={() => {}}
                />
              ))}
            </Row>
          </React.Fragment>
        );
      }
      let timer;
      if (this.props.currentChannel.currentStatus === 'PLAYING_CARD') {
        timer = <DisplayTimer timer={this.props.currentChannel.timer} />;
      } else {
        timer = <DisplayIdle />;
      }
      return (
        <React.Fragment>
          {timer}
          <Row className='CardsContainer CardsContainer_question'>
            <Card
              key='questioncard'
              value={this.getFilledQuestionText(
                this.props.player.answers,
                this.props.player.hand,
              )}
            />
          </Row>
          <Row className='CardsContainer CardsContainer_answer'>
            {this.props.player.hand.map((answer, index) => (
              <Card
                key={answer.text}
                value={answer.text}
                definition={answer.definition}
                onClick={
                  this.props.player.isGameMaster
                    ? () => {}
                    : () => this.handleChange(index)
                }
                checked={this.props.player.answers.indexOf(index) >= 0}
              />
            ))}
          </Row>
        </React.Fragment>
      );
    }
    return null;
  }
}

UnderTheLimits.defaultProps = {
  currentChannel: null,
  player: null,
};

UnderTheLimits.propTypes = {
  selectedAnswers: PropTypes.func.isRequired,
  selectedJudgment: PropTypes.func.isRequired,
  // eslint-disable-next-line
  currentChannel: PropTypes.shape({
    deckQuestion: PropTypes.shape({
      text: PropTypes.string,
    }),
    currentStatus: PropTypes.string,
    players: PropTypes.arrayOf(PropTypes.object),
    timer: PropTypes.string,
    id: PropTypes.string,
  }),
  // eslint-disable-next-line
  player: PropTypes.object
};

export default UnderTheLimits;
