export default theme => ({
  underTheLimits: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'space-around',
    width: '100%',
    height: '100%',
    minHeight: '100vh',
    backgroundImage: `radial-gradient( farthest-corner at 100% 100%, ${theme.palette.primary.main}, ${theme.palette.primary.dark} )`,
    color: 'white',
    textAlign: 'center',
  },

  underTheLimitsContent: {
    zIndex: 1,
    width: '100%',
    height: `calc( 100vh - ${theme.layout.topAppBarHeight} )`,
  },

  underTheLimitsCardsBackground: {
    position: 'absolute',
    zIndex: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    overflow: 'hidden',
    pointerEvents: 'none',

    '&:before': {
      content: '""',
      position: 'absolute',
      zIndex: 0,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      opacity: 0,
      transformOrigin: 'center 40%',
      animation: 'bckgrdEntrance 6s ease-out',
      animationDelay: '.45s',
      animationFillMode: 'forwards',
      // background: {
      //   image: 'url( "/public/images/CardsBckgrd.svg" )',
      //   repeat: 'no-repeat',
      //   position: 'contain',
      // },
      backgroundImage: 'url( "/public/images/CardsBckgrd.svg" )',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      pointerEvents: 'none',
    },
  },

  '@keyframes bckgrdEntrance': {
    from: {
      transform: 'scale3d( .1, .1, .1 )',
      animationTimingFunction: 'cubic-bezier( .55, .055, .675, .19 )',
      opacity: 0,
    },

    '8%': {
      transform: 'scale3d( .9, .9, .9 )',
      animationTimingFunction: 'cubic-bezier( .175, .885, .32, 1 )',
      opacity: '.75',
    },

    to: {
      transform: 'scale3d( 1.33, 1.33, 1.33 )',
      opacity: '.75',
    },
  },
});
