import React, { Component } from 'react';
import './App.css';
import {
    Col
} from 'react-bootstrap';

class AnswerCard extends Component {

  render() {
    return (
      <React.Fragment>
          <Col sm={6} md={3}>
          <div class="card" style={{ width: '20rem'}} onClick={() => this.props.onClick()}>
            <div class="card-body">
                <p class="card-text">{this.props.value}</p>
            </div>
          </div>
          </Col>
      </React.Fragment>
    );
  }
}

export default AnswerCard;
