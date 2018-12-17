import React, { Component } from 'react';
import './App.css';
import {
  Button
} from 'react-bootstrap';

class AnswerCard extends Component {

  constructor(props) {
    super(props);
    this.state = { selected: false };
  }

  render() {
    return (
      <React.Fragment>
        <Card key={this.props.key}
                value={this.props.value} />
      </React.Fragment>
    );
  }
}

function Card(props) {
    return <Button bsStyle="primary" color="primary" size="lg" active>{props.value}</Button>;
}

export default AnswerCard;
