import React from 'react';
import PropTypes from 'prop-types';

import {
  Tooltip,
  Typography,
} from '..';

import './Card.scss';

const Card = ({
  definition, onClick, checked, value,
}) => {
  let MainWrapper = React.Fragment;
  let wrapperProps = {};
  if (definition && definition.length > 0) {
    MainWrapper = Tooltip;
    wrapperProps = {
      placement: 'top',
      id: definition.toLowerCase().replace(' ', '_'), // For accessibility
      title: definition,
    };
  }

  return (
    <MainWrapper {...wrapperProps}>
      <div
        className='card'
        onClick={() => onClick && onClick()}
        role='none'
        style={{ border: checked && '3px solid red' }}
      >
        <div className='card-body'>
          <Typography className='card-text'>{value}</Typography>
        </div>
      </div>
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
