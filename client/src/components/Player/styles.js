export default theme => ({
  playerAvatar: {
    width: '52px',
    height: '52px',
    padding: theme.spacing.unit,
    margin: `${theme.spacing.unit}px 0`,
    backgroundColor: `${theme.palette.primary.dark}${theme.opacity.alpha75}`,
    borderRadius: '100%',
    animationDuration: theme.transitions.duration.complex,
    animationName: 'PoppinAvatar',
  },

  highlightAvatar: {
    boxShadow: 'inset 0px 0px 10px 3px rgba(255,255,225,1)',
  },

  '@keyframes PoppinAvatar': {
    '0%, 20%, 40%, 60%, 80%, 100%': {
      animationTimingFunction: theme.transitions.easing.easeInOut,
    },

    '0%': {
      opacity: '0',
      transform: 'scale3d(0.3, 0.3, 0.3)',
    },

    '20%': {
      transform: 'scale3d(1.4, 1.4, 1.4)',
    },

    '40%': {
      transform: 'scale3d(0.6, 0.6, 0.6)',
    },

    '60%': {
      opacity: '1',
      transform: 'scale3d(1.1, 1.1, 1.1)',
    },

    '80%': {
      transform: 'scale3d(0.8, 0.8, 0.8)',
    },

    '100%': {
      opacity: '1',
      transform: 'scale3d(1, 1, 1)',
    },
  },
});
