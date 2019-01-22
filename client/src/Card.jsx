import React, { Component } from 'react';
import './App.css';
import {
    Col,
    OverlayTrigger,
    Tooltip
} from 'react-bootstrap';

class Card extends Component {

  render() {

    let MainWrapper =  React.Fragment;
    let wrapperProps = {};
    if (this.props.definition && this.props.definition.length > 0) {
      MainWrapper = OverlayTrigger;
      wrapperProps = {
        placement: "top",
        id: this.props.definition.toLowerCase().replace(" ", "_"), // For accessibility
        overlay: (
          <Tooltip>
            {this.props.definition}
          </Tooltip>
        ),
      };
    }

    return (
      <MainWrapper {...wrapperProps}>
          <Col sm={6} md={3}>
            <div
              className="card"
              style={{ width: '20rem'}}
              onClick={() => this.props.onClick && this.props.onClick()}
            >
              <div
                className="card-body"
                style={{ border: ( this.props.checked ? "3px solid red" : "") }}
              >
                  <p className="card-text">
                    {this.props.value}
                  </p>
              </div>
            </div>
          </Col>
      </MainWrapper>
    );
  }
}

export default Card;
