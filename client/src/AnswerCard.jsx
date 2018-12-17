import React, { Component } from 'react';
import './App.css';
import {
  Button
} from 'react-bootstrap';

class AnswerCard extends Component {

  constructor(props) {
    super(props);
    this.state = { selected: false };

    this.onClickBtn = this.onClickBtn.bind(this);
  }

    onClickBtn() {
        this.props.onChange( this.props.value );
    }

  render() {
    return (
      <React.Fragment>
        <Button bsStyle="primary" size="lg" onClick={()=> {
              this.onClickBtn();
          }}>{this.props.value}</Button>
      </React.Fragment>
    );
  }
}

export default AnswerCard;
