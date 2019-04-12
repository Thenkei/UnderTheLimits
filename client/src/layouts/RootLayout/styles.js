export default () => ({
  underTheLimits: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'space-around',
    width: '100%',
    height: '100%',
    minHeight: '100vh',
    backgroundImage: 'radial-gradient( farthest-corner at 100% 100%, #0e4a70, #031723 )',
    color: 'white',
    textAlign: 'center',
  },

  underTheLimitsContent: {
    zIndex: '1',
    width: '100%',
    // height: calc( 100vh - #{$top-app-bar-height} ),
  },

  underTheLimitsCardsBackground: {
    position: 'absolute',
    zIndex: '0',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    overflow: 'hidden',
    pointerEvents: 'none',
    '&:before': {
      content: '',
      position: 'absolute',
      zIndex: '0',
      top: '0',
      right: '0',
      bottom: '0',
      left: '0',
      transform: 'scale3d( 1.33, 1.33, 1.33 )',
      transformOrigin: 'center 40%',
      animation: 'bckgrdEntrance 6s ease-out',
      background: {
        image: 'url( "/public/images/CardsBckgrd.svg" )',
        repeat: 'center',
        size: 'contain',
      },
      pointerEvents: 'none',
    },
  },

  '@keyframes bckgrdEntrance': {
    from: {
      transform: 'scale3d( .1, .1, .1 )',
      animationTimingFunction: 'cubic-bezier( .55, .055, .675, .19 )',
      opacity: '0',
    },

    '8%': {
      transform: 'scale3d( .9, .9, .9 )',
      animationTimingFunction: 'cubic-bezier( .175, .885, .32, 1 )',
      opacity: '.75',
    },
  },
});
