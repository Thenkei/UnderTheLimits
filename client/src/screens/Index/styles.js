export default () => ({
  LoginFormWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    overflow: 'auto',
  },

  LoginFormAnimated: {
    animation: 'fadeInDown .25s ease-out',
    animationFillMode: 'forwards',
    opacity: 0,
  },

  '@keyframes fadeInDown': {
    from: {
      transform: 'scale( .25, .25 )',
      opacity: 0,
    },

    '66%': {
      transform: 'scale( 1.25, 1.25 )',
    },

    '100%': {
      transform: 'scale( 1, 1 )',
      opacity: 1,
    },
  },

});
