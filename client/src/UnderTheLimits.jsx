import React, { Component } from 'react';
import './App.css';
import {
  ToggleButtonGroup,
  ButtonToolbar,
  Button,
  Row
} from 'react-bootstrap';
import AnswerCard from './AnswerCard';

class UnderTheLimits extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: [],
      answerSelectNum: 1
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(change) {
      const index = this.state.value.indexOf(change);
      if (index < 0) {
          if (this.state.value.length >= this.state.answerSelectNum) {
            console.warn(`Can't select more answers for this question`); // TODO Change with <Alert color="primary">
          }else {
            this.state.value.push(change);
          }
      } else {
          this.state.value.splice(index, 1);
      }
      console.warn(this.state.value);
      this.setState({ value: [...this.state.value] });
  }

  handleQuestion() {
     //return this.props.currentChannel.deckQuestions[0].replace('______', this.state.answerSelected);
  }

  componentDidUpdate(prevProps) {
  }

  render() {
    if(this.props.player && this.props.player.hand) {
    return (
    <React.Fragment>
    <Row>
      <Button bsStyle="warning" size="lg" active>{this.props.currentChannel.deckQuestions[0]}</Button>
      </Row>
      <Row>
      <ButtonToolbar>
      <ToggleButtonGroup
        type="checkbox"
        value={this.state.value}
        onChange={this.handleChange}
      >
      {
          this.props.player.hand.map((answer) =>
              <AnswerCard key={answer.toString()}
                    value={answer} onChange={this.handleChange}/>
      )}
      </ToggleButtonGroup>
      </ButtonToolbar>
    </Row>
    </React.Fragment>
    );
    } else {
     return null;
    }
  }
}

export default UnderTheLimits;
