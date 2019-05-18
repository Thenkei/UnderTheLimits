export default theme => ({
  UTLLogoWrapper: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      opacity: 0,
      background: `radial-gradient(${theme.palette.primary.light}, ${theme.palette.primary.main}${theme.opacity.alpha00})`,
      animation: 'flash .2s ease-out',
      animationDelay: '.65s',
    },
  },

  '@keyframes flash': {
    from: {
      opacity: 0,
    },

    '45%': {
      opacity: 0.4,
    },

    '55%': {
      opacity: 0.4,
    },

    to: {
      opacity: 0,
    },
  },

  UTLLogo: {
    animation: 'IncommingLogo .5s ease-out',
    animationDelay: '.5s',
    animationFillMode: 'forwards',
    opacity: 0,
    transformOrigin: 'center center',
    width: '100%',
    maxWidth: 600,
    marginRight: '-7%',
  },

  '@keyframes IncommingLogo': {
    from: {
      opacity: 0,
      transform: 'scale3d(7, 7, 7)',
    },

    '12%': {
      opacity: 0,
    },

    '45%': {
      opacity: 1,
      transform: 'scale3d(.90, .90, .90)',
    },

    '52%': {
      transform: 'scale3d(1, 1, 1)',
    },

    to: {
      opacity: 1,
      transform: 'scale3d(1, 1, 1)',
    },
  },


  LoginFormWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: `${theme.spacing.unit * 2}px`,
  },

  LoginFormAnimated: {
    animation: 'fadeInDown .5s',
    animationTimingFunction: 'cubic-bezier( .55, .055, .675, .19 )',
    animationDelay: '1s',
    animationFillMode: 'forwards',
    opacity: 0,
  },

  '@keyframes fadeInDown': {
    from: {
      transform: 'translate(0, -110%)',
      opacity: 0,
    },

    '80%': {
      transform: 'translate(0, 8px)',
      opacity: 1,
    },

    '100%': {
      transform: 'translate(0, 0)',
      opacity: 1,
    },
  },

});
