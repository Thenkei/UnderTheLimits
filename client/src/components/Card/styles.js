export default theme => ({

  cardWrapper: {
    position: 'relative',
    width: 187,
    minHeight: 280,
    maxHeight: 280,
    margin: theme.spacing(2, 1, 0),
    animationDuration: '0.75s',
    animationFillMode: 'forwards',
    animationName: '$bounceIn',

    '&:hover': {
      '& $card': {
        transform: 'rotate(-2deg)',
      },

      '& $cardShadow': {
        transform: 'rotate(12deg)',
        opacity: 0.8,
      },
    },
  },

  card: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    backfaceVisibility: 'hidden',
    transition: `all ${theme.transitions.easing.easeInOut} ${theme.transitions.duration.short}ms`,
    border: `2px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.main,
    boxShadow: theme.shadows[1],
    wordWrap: 'break-word',
    cursor: 'pointer',
    willChange: 'transform',
    zIndex: 2,
  },

  cardShadow: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: theme.palette.primary.main,
    transform: 'scale(1.02, 1.02) rotate(4deg)',
    opacity: 0.4,
    transition: `all ${theme.transitions.easing.easeInOut} ${theme.transitions.duration.short}ms`,
  },

  cardChecked: {
    border: `4px solid ${theme.palette.secondary.main}`,
    color: theme.palette.secondary.main,
  },

  cardBody: {
    flex: '1 1 auto',
    padding: theme.spacing(2),
  },

  questionCard: {
    margin: 0,
    backgroundColor: 'transparent',
    color: theme.palette.common.white,
    width: '100%',
    padding: theme.spacing(4),
    borderBottom: `solid 1px ${theme.palette.primary.dark}${theme.opacity.alpha50}`,
    boxShadow: theme.shadows[6],
    zIndex: 9,

    '& $cardBody': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      lineHeight: 1.5,
    },
  },

  proposalCard: {
    backgroundColor: 'transparent',
    color: theme.palette.common.white,
  },

  '@keyframes bounceIn': {
    'from, 20%, 40%, 60%, 80%, to': {
      animationTimingFunction: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    },

    '0%': {
      opacity: 0,
      transform: 'scale3d(0.3, 0.3, 0.3)',
    },

    '20%': {
      transform: 'scale3d(1.1, 1.1, 1.1)',
    },

    '40%': {
      transform: 'scale3d(0.9, 0.9, 0.9)',
    },

    '60%': {
      opacity: 1,
      transform: 'scale3d(1.03, 1.03, 1.03)',
    },

    '80%': {
      transform: 'scale3d(0.97, 0.97, 0.97)',
    },

    '100%': {
      opacity: 1,
      transform: 'scale3d(1, 1, 1)',
    },
  },

});
