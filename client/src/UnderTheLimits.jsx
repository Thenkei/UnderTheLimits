import React, { Component } from 'react';
import './App.css';
import{
selectedAnswers,
selectedJudgment
} from './Api';
import {
  Row
} from 'react-bootstrap';
import Card from './Card';

class UnderTheLimits extends Component {

  constructor(props) {
    super(props);

    this.state = {
      answerSelectNum: 1
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    const currentDeckQuestion = this.props.currentChannel.deckQuestion.text;
    const prevDeckQuestion = prevProps.currentChannel.deckQuestion.text;
    if ( currentDeckQuestion !== prevDeckQuestion) {
      const occurences = (currentDeckQuestion.match(/______/g) || []).length;
      this.setState({ answerSelectNum: occurences });
    }
  }

  handleChange(i) {
      const index = this.props.player.answers.indexOf(i);
      if (index < 0) {
          if (this.props.player.answers.length >= this.state.answerSelectNum) {
            console.warn(`Vous ne pouvez pas jouer davantage de réponses pour cette question !`); // TODO Change with <Alert color="primary">
          }else {
            this.props.player.answers.push(i);
          }
      } else {
          this.props.player.answers.splice(index, 1);
      }

      selectedAnswers(this.props.currentChannel.id, this.props.player.answers);
  }

  getFilledQuestionText(keys, values) {
      let questionText = this.props.currentChannel.deckQuestion.text;
      keys.map((i) => questionText = questionText.replace('______', values[i].text));
      return questionText;
 }

  render() {
    if(this.props.player && this.props.player.hand) {
        if(this.props.currentChannel.currentStatus === 'JUDGING_CARD') {
            const playersShuffle = this.props.currentChannel.players.slice();
            for (let i = playersShuffle.length - 1; i > 0; i -= 1) {
              const j = Math.floor(Math.random() * (i + 1));
              [playersShuffle[i], playersShuffle[j]] = [playersShuffle[j], playersShuffle[i]];
            }

            return (
            <React.Fragment>
                <Row>
                <React.Fragment>
                {playersShuffle.map(player => {
                if (!player.isGameMaster){ return(
                  <Card
                  key={'p'+player.id}
                  value={this.getFilledQuestionText(player.answers, player.hand)}
                  onClick={this.props.player.isGameMaster?() => selectedJudgment(this.props.currentChannel.id, player.id):() => {}}
                  />
              )}else{
                  return null;
              }})}
                </React.Fragment>
                </Row>
            </React.Fragment>
            );

        }else if(this.props.currentChannel.currentStatus === 'WAITING_GAME') {

            const player = this.props.currentChannel.players.find((p) => {return p.isGameMaster;});

            return (
            <React.Fragment>
                <Row>
                <p>Le gagnant de la manche est {player.name} :</p>
                {
                <Card
                key={'p'+player.id}
                value={this.getFilledQuestionText(player.answers, player.hand)}
                onClick={() => {}}
                />
                }
                </Row>
                <Row>
                {
                    this.props.player.hand.map((answer, index) => (
                      <Card
                        key={answer.text}
                        value={answer.text}
                        definition={answer.definition}
                        onClick={() => {}}
                      />
                    ))
                }
                </Row>
            </React.Fragment>
            );
        } else {
            return (
            <React.Fragment>
                <h3>Il reste {this.props.currentChannel.timer}s</h3>
                <Row>
                    <Card key='questioncard' value={this.getFilledQuestionText(this.props.player.answers, this.props.player.hand)}/>
                </Row>
                <Row>
                {
                    this.props.player.hand.map((answer, index) => (
                      <Card
                        key={answer.text}
                        value={answer.text}
                        definition={answer.definition}
                        onClick={this.props.player.isGameMaster?() => {}:() => this.handleChange(index)}
                        checked={this.props.player.answers.indexOf(index) >= 0}
                      />
                    ))
                }
                </Row>
            </React.Fragment>
            );
        }
    } else {
     return null;
    }
  }
}

export default UnderTheLimits;
