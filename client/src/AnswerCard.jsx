import React, { Component } from 'react';
import './App.css';
import {
  Button
} from 'react-bootstrap';

class AnswerCard extends Component {

  render() {
    return (
      <React.Fragment>
        <Button bsStyle="primary" size="lg" onClick={() => this.props.onClick()}>{this.props.value}</Button>
      </React.Fragment>
    );
  }
}

export default AnswerCard;
