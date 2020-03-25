import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Card from '../Card';
import Header from './header';
import { withStyles } from '..';

import styles from './styles';

class LimitedGames extends Component {
  handleChange = (i) => {
    const index = this.props.player.answers.indexOf(i);
    if (index < 0) {
      this.props.player.answers.push(i);
    } else {
      this.props.player.answers.splice(index, 1);
    }

    this.props.selectedAnswers(this.props.player.answers);
  };

  render() {
    if (this.props.player && this.props.player.hand) {
      return (
        <React.Fragment>
          {this.props.currentChannel.currentStatus === 'PLAYING_CARD' && (
          <div className={this.props.classes.game}>
            <Card
              questionCard
              key='questioncard'
              value={this.props.currentChannel.lastCard}
            />
            <div className={this.props.classes.cardsContainer}>
              {this.props.player.hand.map((answer, index) => (
                <Card
                  className={this.props.classes.cardGame.text}
                  key={answer.text}
                  value={answer.text}
                  definition={answer.definition}
                  onClick={
                    this.props.player.isGameMaster
                      ? () => this.handleChange(index)
                      : () => { }
                  }
                  checked={this.props.player.answers.indexOf(index) >= 0}
                />
              ))}
            </div>
          </div>
          )}
        </React.Fragment>
      );
    }
    return null;
  }
}

LimitedGames.defaultProps = {
  currentChannel: null,
  player: null,
};

LimitedGames.propTypes = {
  classes: PropTypes.object.isRequired,

  selectedAnswers: PropTypes.func.isRequired,
  // eslint-disable-next-line
  currentChannel: PropTypes.shape({
    lastCard: PropTypes.shape({
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

LimitedGames.Header = Header;

export default withStyles(styles, { useTheme: true })(LimitedGames);
