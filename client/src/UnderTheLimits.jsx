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
      value: [],
      answerSelectNum: 1
    };

    this.handleChange = this.handleChange.bind(this);
  }

  renderAnswerCard(text, i) {
      return <Card key={text} value={text} onClick={() => this.handleChange(i)}/>;
  }

  renderQuestionCard() {
      return <Card key='questioncard' value={this.renderQuestion(this.props.player.answers, this.props.player.hand)}/>;
  }

  renderPlayersQuestionCard() {
      return (
        <React.Fragment>
        {this.props.currentChannel.players.map(player => (
          <Card
          key={'p'+player.id}
          value={this.renderQuestion(player.answers, player.hand)}
          onClick={() => selectedJudgment(this.props.currentChannel.id, player.id)}
          />
        ))}
      </React.Fragment>
    );
  }

  handleChange(i) {
      const index = this.props.player.answers.indexOf(i);
      console.warn(i);
      if (index < 0) {
          if (this.props.player.answers.length >= this.state.answerSelectNum) {
            console.warn(`Can't select more answers for this question`); // TODO Change with <Alert color="primary">
          }else {
            this.props.player.answers.push(i);
          }
      } else {
          this.props.player.answers.splice(index, 1);
      }
      this.setState({ value: [...this.props.player.answers] });

      selectedAnswers(this.props.currentChannel.id, this.props.player.answers);
  }

  renderQuestion(keys, values) {
      let questionText = this.props.currentChannel.deckQuestions[0];
      keys.map((i) => questionText = questionText.replace('______', values[i]));

      return questionText;
 }

  render() {
    if(this.props.player && this.props.player.hand) {
        if(this.props.currentChannel.currentStatus === 'JUDGING_CARD') {
            if(this.props.player.isGameMaster) {
                return (
                <React.Fragment>
                    <Row>
                    {
                        this.renderPlayersQuestionCard()
                    }
                    </Row>
                </React.Fragment>
                );
            }else{
                return (
                <React.Fragment>
                    <Row>
                    Game master is judging...
                    </Row>
                </React.Fragment>
                );
            }

    }else if(this.props.currentChannel.currentStatus === 'WAITING_GAME') {
        return (
        <React.Fragment>
            <Row>
            Waiting for next round. . .
            </Row>
            <Row>
            {
                this.props.player.hand.map((answer, index) => this.renderAnswerCard(answer, index))
            }
            </Row>
        </React.Fragment>
        );
    } else {
        if(this.props.player.isGameMaster) {
            return (
            <React.Fragment>
                <Row>
                {
                    this.renderQuestionCard()
                }
                </Row>
                <Row>
                Waiting for player decision. . .
                </Row>
            </React.Fragment>
            );
        } else {
            return (
            <React.Fragment>
                <Row>
                {
                    this.renderQuestionCard()
                }
                </Row>
                <Row>
                {
                    this.props.player.hand.map((answer, index) => this.renderAnswerCard(answer, index))
                }
                </Row>
            </React.Fragment>
            );
        }
    }
    } else {
     return null;
    }
  }
}

export default UnderTheLimits;
