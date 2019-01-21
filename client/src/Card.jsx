import React, { Component } from 'react';
import './App.css';
import {
    Col
} from 'react-bootstrap';

class Card extends Component {

  render() {
    return (
      <React.Fragment>
          <Col sm={6} md={3}>
          <div className="card" style={{ width: '20rem'}} onClick={() => this.props.onClick && this.props.onClick()}>
            <div className="card-body">
                <p className="card-text">{this.props.value}</p>
            </div>
          </div>
          </Col>
      </React.Fragment>
    );
  }
}

export default Card;
