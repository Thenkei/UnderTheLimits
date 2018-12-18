import React, { Component } from 'react';
import './App.css';
import {
  Row
} from 'react-bootstrap';
import AnswerCard from './AnswerCard';
import QuestionCard from './QuestionCard';


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
      return <AnswerCard key={text} value={text} onClick={() => this.handleChange(i)}/>;
  }

  renderQuestionCard() {
      return <QuestionCard key='questioncard' value={this.renderQuestion()}/>;
  }

  handleChange(i) {
      const index = this.state.value.indexOf(i);
      console.warn(i);
      if (index < 0) {
          if (this.state.value.length >= this.state.answerSelectNum) {
            console.warn(`Can't select more answers for this question`); // TODO Change with <Alert color="primary">
          }else {
            this.state.value.push(i);
          }
      } else {
          this.state.value.splice(index, 1);
      }
      console.warn(this.state.value);
      this.setState({ value: [...this.state.value] });
  }

  renderQuestion() {
      let questionText = this.props.currentChannel.deckQuestions[0];
      this.state.value.map((i) => questionText = questionText.replace('______', this.props.player.hand[i]));

      return questionText;
 }

  render() {
    if(this.props.player && this.props.player.hand) {
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
    } else {
     return null;
    }
  }
}

export default UnderTheLimits;
