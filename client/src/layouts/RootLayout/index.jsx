import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
} from '../../components';

import './style.scss';

class RootLayout extends React.Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    const {
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
      <div className='UnderTheLimits'>
        <div className='UnderTheLimits-cardsBackground' />
        <TopAppBar />
        <Sound
          url={`/public/sounds/${sound}`}
          playStatus={isPlaySound ? Sound.status.PLAYING : Sound.status.STOPPED}
          volume={isSoundMuted ? 0 : 100}
          onFinishedPlaying={() => appStopSound()}
        />
        <div className='UnderTheLimits-content'>
          { children }
          {message && (
            <Snackbar
              open
              onClose={() => remove()}
              autoHideDuration={6000}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              message={message}
            />
          )}
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
  children: PropTypes.shape({}).isRequired,

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
export default connect(mapStateToProps, mapDispatchToProps)(RootLayout);
