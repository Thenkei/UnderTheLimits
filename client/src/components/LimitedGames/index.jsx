import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Card from '../Card';
import Header from './header';
import { withStyles } from '..';

import styles from './styles';

class LimitedGames extends Component {
  handleChange = (i) => {
    this.props.player.answers.push(i);
    this.props.selectedAnswers(this.props.player.answers);
  };

  render() {
    if (this.props.player && this.props.player.hand && this.props.currentChannel.currentStatus === 'PLAYING_CARD') {
      return (
        <React.Fragment>
          <div className={this.props.classes.cardsContainer}>
            {
              <Card
                key='lastcard'
                value={this.props.currentChannel.lastCard.text}
                onClick={() => { }}
              />
            }
          </div>
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
                      : () => { }}
              />
            ))}
          </div>
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
