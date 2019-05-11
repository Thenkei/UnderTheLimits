import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  Tooltip,
  Typography,
  withStyles,
} from '..';

import styles from './styles';

const Card = ({
  classes, definition, onClick, checked, questionCard, proposalCard, value,
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
        className={classNames({
          [classes.card]: !questionCard,
          [classes.questionCard]: questionCard,
          [classes.proposalCard]: proposalCard,
          [classes.cardChecked]: checked,
        })}
        onClick={() => onClick && onClick()}
        role='none'
      >
        <Typography className={classes.cardBody} color='inherit' variant={questionCard && 'h5'}>{value}</Typography>
      </div>
    </MainWrapper>
  );
};

Card.defaultProps = {
  definition: null,
  onClick: null,
  checked: false,
  questionCard: false,
  proposalCard: false,
  value: '',
};

Card.propTypes = {
  classes: PropTypes.object.isRequired,

  definition: PropTypes.string,
  onClick: PropTypes.func,
  checked: PropTypes.bool,
  questionCard: PropTypes.bool,
  proposalCard: PropTypes.bool,
  value: PropTypes.string,
};

export default withStyles(styles, { withTheme: true })(Card);
