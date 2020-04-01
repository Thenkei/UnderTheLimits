import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Card from '../Card';
import Header from './header';
import Leaderboard from '../Leaderboard';
import { withStyles } from '..';

import styles from './styles';

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
        return (
          <div className={this.props.classes.cardsContainer}>
            {this.props.currentChannel.players.map((player) => {
              if (!player.isGameMaster) {
                return (
                  <Card
                    proposalCard
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
                        : () => { }
                    }
                  />
                );
              }
              return null;
            })}
          </div>
        );
      }
      if (this.props.currentChannel.currentStatus === 'WAITING_GAME') {
        const player = this.props.currentChannel.players.find(
          p => p.isGameMaster,
        );

        return (
          <React.Fragment>
            <div className={this.props.classes.cardsContainer}>
              <Card
                key={`p${player.id}`}
                value={this.getFilledQuestionText(
                  player.answers,
                  player.hand,
                )}
                onClick={() => { }}
              />
            </div>
            <div className={this.props.classes.cardsContainer}>
              {this.props.player.hand.map(answer => (
                <Card
                  key={answer.text}
                  value={answer.text}
                  definition={answer.definition}
                  onClick={() => { }}
                />
              ))}
            </div>
          </React.Fragment>
        );
      }

      return (
        <React.Fragment>
          {this.props.currentChannel.currentStatus === 'PLAYING_CARD' && (
          <div className={this.props.classes.game}>
            <Card
              questionCard
              key='questioncard'
              value={this.getFilledQuestionText(
                this.props.player.answers,
                this.props.player.hand,
              )}
            />
            <div className={this.props.classes.cardsContainer}>
              {this.props.player.hand.map((answer, index) => (
                <Card
                  className={this.props.classes.cardGame}
                  key={answer.text}
                  value={answer.text}
                  definition={answer.definition}
                  onClick={
                    this.props.player.isGameMaster
                      ? () => { }
                      : () => this.handleChange(index)
                  }
                  checked={this.props.player.answers.indexOf(index) >= 0}
                />
              ))}
            </div>
          </div>
          )}
          {this.props.currentChannel.currentStatus === 'IDLE' && (
            <Leaderboard
            data={this.props.currentChannel.players}
            sortBy='score'
            labelBy='name'
            />
          )}
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
  classes: PropTypes.object.isRequired,

  selectedAnswers: PropTypes.func.isRequired,
  selectedJudgment: PropTypes.func.isRequired,
  // eslint-disable-next-line
  currentChannel: PropTypes.shape({
    deckQuestion: PropTypes.shape({
      text: PropTypes.string,
    }),
    currentStatus: PropTypes.string,
    players: PropTypes.arrayOf(PropTypes.object),
    timer: PropTypes.number,
    id: PropTypes.string,
  }),
  // eslint-disable-next-line
  player: PropTypes.object
};

UnderTheLimits.Header = Header;

export default withStyles(styles, { useTheme: true })(UnderTheLimits);
