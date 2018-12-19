import React, { Component } from 'react';
import './App.css';
import {
  Button
} from 'react-bootstrap';

class QuestionCard extends Component {

  render() {
    return (
      <React.Fragment>
        <Button bsStyle="warning" size="lg" active>{this.props.value}</Button>
      </React.Fragment>
    );
  }
}

export default QuestionCard;
