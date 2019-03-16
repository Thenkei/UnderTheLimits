import React from 'react';
import PropTypes from 'prop-types';

import { Badge } from 'react-bootstrap';

const Player = ({ value, noScore }) => (
  <React.Fragment>
    <dt>
      {value.isGameMaster ? '>' : ''}
      <Badge>{value.name}</Badge>
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
    score: 0,
    isGameMaster: false,
  },
  noScore: false,
};

Player.propTypes = {
  value: PropTypes.shape({ name: PropTypes.string, score: PropTypes.string }),
  noScore: PropTypes.bool,

};


export default Player;
