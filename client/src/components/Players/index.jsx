import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles, Typography } from '..';
import Player from '../Player';

import styles from './styles';

const Score = ({
  channel,
  classes,
  players,
  noScore = false,
}) => {
  let playerMap = null;
  if (channel) {
    const { playerMaxPoint } = channel.opts;
    playerMap = channel.players
      .sort((p1, p2) => p1.score < p2.score)
      .reduce((acc, p) => {
        if (!acc[p.score]) {
          acc[p.score] = [p];
        } else {
          acc[p.score].push(p);
        }
        return acc;
      }, {});
    for (let i = 0; i < playerMaxPoint + 1; i += 1) {
      if (!playerMap[i]) {
        playerMap[i] = [];
      }
    }
  }
  return (
    <div className={classes.root}>
      <div className={classNames(classes.scorePositions, classes.scoreFiller)}>
        <div className={classes.scoreNumbers} />
      </div>
      {!channel ? (players.map(p => (
        <div key={p.id} className={classes.scorePositions}>
          <div className={classes.scoreNumbers} />
          <div className={classes.avatarZone}>
            <Player value={p} noScore={noScore} />
          </div>
        </div>
      )))
        : Object.entries(playerMap).map(([score, ps]) => (
          <div key={score} className={classes.scorePositions}>
            <Typography variant='h6' className={classes.scoreNumbers}>
              {score}
            </Typography>
            <div className={classes.avatarZone}>
              {ps.map(p => (
                <Player key={p.id} value={p} noScore={noScore} />
              ))}
            </div>
          </div>
        ))
     }
    </div>
  );
};

Score.defaultProps = {
  players: [],
  noScore: true,
  channel: null,
};

Score.propTypes = {
  classes: PropTypes.object.isRequired,

  players: PropTypes.arrayOf(PropTypes.shape({})),
  noScore: PropTypes.bool,
  channel: PropTypes.any,
};

export default withStyles(styles, { withTheme: true })(Score);
