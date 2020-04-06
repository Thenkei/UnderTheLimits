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
      answers: [],
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentChannel.deckQuestion) {
      const currentDeckQuestion = this.props.currentChannel.deckQuestion.text;
      const prevDeckQuestion = prevProps.currentChannel.deckQuestion.text;
      if (currentDeckQuestion !== prevDeckQuestion) {
        const occurences = (currentDeckQuestion.match(/______/g) || []).length;
        // eslint-disable-next-line
        this.setState({ answerSelectNum: occurences });
        this.setState({ answers: [] });
      }
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
    const index = this.state.answers.indexOf(i);
    if (index < 0) {
      if (this.state.answers.length >= this.state.answerSelectNum) {
        // eslint-disable-next-line
        console.warn(
          'Vous ne pouvez pas jouer davantage de réponses pour cette question !',
        ); // TODO Change with <Alert color='primary'>
      } else {
        this.state.answers.push(i);
      }
    } else {
      this.state.answers.splice(index, 1);
    }

    this.props.selectedAnswers(this.state.answers);
  };

  render() {
    if (this.props.player && this.props.currentChannel.secret) {
      if (this.props.currentChannel.cards && this.props.currentChannel.currentStatus === 'JUDGING_CARD') {
        return (
          <div className={this.props.classes.cardsContainer}>
            {this.props.currentChannel.cards.map(card => (
                <Card
                  proposalCard
                  key={`p${card.id}`}
                  value={card.value}
                  onClick={
                    this.props.player.isGameMaster
                      ? () => this.props.selectedJudgment(
                        card.id,
                      )
                      : () => { }
                  }
                />
            ))}
          </div>
        );
      }
      if (this.props.currentChannel.currentStatus === 'WAITING_GAME') {
        return (
          <React.Fragment>
            <div className={this.props.classes.game}>
              {this.props.currentChannel.results
              && <div className={this.props.classes.cardsContainer}>
                {this.props.currentChannel.results.map(card => (
                  <Card
                    proposalCard
                    key={`p${card.id}`}
                    value={card.value}
                    info={card.info}
                    onClick={() => { }}
                  />
                ))}
              </div>}
              <Leaderboard
                data={this.props.currentChannel.players}
                sortBy='score'
                labelBy='name'
              />
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
                this.state.answers,
                this.props.currentChannel.secret.hand,
              )}
            />
            <div className={this.props.classes.cardsContainer}>
              {this.props.currentChannel.secret.hand.map((answer, index) => (
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
                  checked={this.state.answers.indexOf(index) >= 0}
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
    secret: PropTypes.object,
    cards: PropTypes.arrayOf(PropTypes.object),
    results: PropTypes.arrayOf(PropTypes.object),
  }),
  // eslint-disable-next-line
  player: PropTypes.object
};

UnderTheLimits.Header = Header;

export default withStyles(styles, { useTheme: true })(UnderTheLimits);
