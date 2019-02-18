import React from 'react';
import PropTypes from 'prop-types';

import {
  Col,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';

const Card = ({
  definition,
  onClick,
  checked,
  value,
}) => {
  let MainWrapper = React.Fragment;
  let wrapperProps = {};
  if (definition && definition.length > 0) {
    MainWrapper = OverlayTrigger;
    wrapperProps = {
      placement: 'top',
      id: definition.toLowerCase().replace(' ', '_'), // For accessibility
      overlay: (
        <Tooltip>
          {definition}
        </Tooltip>
      ),
    };
  }

  return (
    <MainWrapper {...wrapperProps}>
      <Col sm={6} md={3}>
        <div
          className="card"
          style={{ width: '20rem' }}
          onClick={() => onClick && onClick()}
          // Ugly, but mandatory for jsx-a11y to be happy
          onKeyPressed={() => {}}
          role="none"
        >
          <div
            className="card-body"
            style={{ border: (checked ? '3px solid red' : '') }}
          >
            <p className="card-text">
              {value}
            </p>
          </div>
        </div>
      </Col>
    </MainWrapper>
  );
};

Card.defaultProps = {
  definition: null,
  onClick: null,
  checked: false,
  value: '',
};

Card.propTypes = {
  definition: PropTypes.string,
  onClick: PropTypes.func,
  checked: PropTypes.bool,
  value: PropTypes.string,
};

export default Card;
