import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Sound from 'react-sound';

import {
  wssInit,
  stopSound,
  removeErrorMessage,
  removeSuccessMessage,
} from '../../reducers/app';

import {
  Snackbar,
  TopAppBar,
  withStyles,
} from '../../components';

import styles from './styles';

class RootLayout extends React.Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    const {
      classes,
      children,
      error,
      success,
      isPlaySound,
      isSoundMuted,
      appStopSound,
      sound,
      appRemoveErrorMessage,
      appRemoveSuccessMessage,
    } = this.props;

    const message = error || success;
    const remove = error ? appRemoveErrorMessage : appRemoveSuccessMessage;

    return (
      <div className={classes.underTheLimits}>
        <div className={classes.underTheLimitsCardsBackground} />
        <TopAppBar gotoHomepage={() => this.props.history.push('/')} />
        <Sound
          url={`/public/sounds/${sound}`}
          playStatus={isPlaySound ? Sound.status.PLAYING : Sound.status.STOPPED}
          volume={isSoundMuted ? 0 : 100}
          onFinishedPlaying={() => appStopSound()}
        />
        <div className={classes.underTheLimitsContent}>
          { children }
          <Snackbar
            open={message}
            onClose={() => remove()}
            autoHideDuration={6000}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            message={message}
          />
        </div>
      </div>
    );
  }
}

RootLayout.defaultProps = {
  error: null,
  success: null,
};

RootLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,

  error: PropTypes.string,
  success: PropTypes.string,
  sound: PropTypes.string.isRequired,
  isPlaySound: PropTypes.bool.isRequired,
  isSoundMuted: PropTypes.bool.isRequired,

  init: PropTypes.func.isRequired,
  appStopSound: PropTypes.func.isRequired,
  appRemoveErrorMessage: PropTypes.func.isRequired,
  appRemoveSuccessMessage: PropTypes.func.isRequired,

};

const mapStateToProps = (state) => {
  const {
    errorMessage,
    success,
    sound,
    isPlaySound,
    isSoundMuted,
  } = state.app;
  return {
    error: errorMessage,
    success,
    sound,
    isPlaySound,
    isSoundMuted,
  };
};

const mapDispatchToProps = dispatch => ({
  init: () => {
    dispatch(wssInit());
  },
  appStopSound: () => dispatch(stopSound()),
  appRemoveErrorMessage: () => dispatch(removeErrorMessage()),
  appRemoveSuccessMessage: () => dispatch(removeSuccessMessage()),
});
export default withRouter(
  withStyles(styles, { useTheme: true })(connect(mapStateToProps, mapDispatchToProps)(RootLayout)),
);
