import React, { Component } from 'react';
import './App.css';
import {
  ToggleButtonGroup,
  Button,
  Row
} from 'react-bootstrap';
import AnswerCard from './AnswerCard';

class UnderTheLimits extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: []
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e });
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.userID !== prevProps.userID) {
      this.fetchData(this.props.userID);
    }
  }

  render() {
     console.warn(this.props.player);
     console.warn(this.props.player.hand);
    if(this.props.player && this.props.player.hand) {
    return (
    <React.Fragment>
    <Row>
      <Button bsStyle="warning" size="lg" active>{this.props.currentChannel.deckQuestions[0]}</Button>
      </Row>
      <Row>
      <ToggleButtonGroup
        type="checkbox"
        value={this.state.value}
        onChange={this.handleChange}
      >
      {
          this.props.player.hand.map((answer) =>
              <AnswerCard key={answer.toString()}
                    value={answer}/>
      )}
      </ToggleButtonGroup>
    </Row>
    </React.Fragment>
    );
    } else {
     return null;
    }
  }
}

export default UnderTheLimits;
