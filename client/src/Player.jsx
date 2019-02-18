import React from 'react';
import PropTypes from 'prop-types';

import { Badge, Label } from 'react-bootstrap';

const Player = ({ value, noScore }) => (
  <React.Fragment>
    <dt>
      {value.isGameMaster ? '>' : ''}
      <Label>{value.name}</Label>
      { !noScore && (
        <Badge>
          {value.score}
          {' '}
          pt(s)
        </Badge>
      ) }
    </dt>
  </React.Fragment>
);

Player.defaultProps = {
  value: {
    name: '',
    score: 'null',
    isGameMaster: false,
  },
  noScore: false,
};

Player.propTypes = {
  value: PropTypes.shape({ name: PropTypes.string, score: PropTypes.string }),
  noScore: PropTypes.bool,

};


export default Player;
