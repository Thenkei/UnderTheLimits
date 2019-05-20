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
  classes, className, definition, onClick, checked, questionCard, proposalCard, value,
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
      <div className={classNames({ [classes.cardWrapper]: !questionCard }, className)}>
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
          <Typography className={classes.cardBody} color='inherit' variant={questionCard ? 'h5' : 'body1'}>{value}</Typography>
        </div>
        {!questionCard && <div className={classes.cardShadow} />}
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
  className: null,
};

Card.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,

  definition: PropTypes.string,
  onClick: PropTypes.func,
  checked: PropTypes.bool,
  questionCard: PropTypes.bool,
  proposalCard: PropTypes.bool,
  value: PropTypes.string,
};

export default withStyles(styles, { withTheme: true })(Card);
