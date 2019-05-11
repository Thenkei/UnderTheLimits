export default theme => ({

  card: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    width: 187,
    minHeight: 280,
    maxHeight: 280,
    overflow: 'auto',
    margin: `${theme.spacing.unit * 2}px ${theme.spacing.unit}px 0`,
    backfaceVisibility: 'hidden',
    transition: `all ${theme.transitions.easing.easeInOut} ${theme.transitions.duration.short}ms`,
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: 8,
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.main,
    boxShadow: theme.shadows[1],
    wordWrap: 'break-word',
    cursor: 'pointer',
    willChange: 'transform',
    animationDuration: '0.75s',
    animationFillMode: 'forwards',
    animationName: 'bounceIn',

    '&:hover': {
      marginTop: theme.spacing.unit,
      boxShadow: theme.shadows[6],
    },
  },

  cardChecked: {
    border: `4px solid ${theme.palette.secondary.main}`,
    color: theme.palette.secondary.main,
  },

  cardBody: {
    flex: '1 1 auto',
    padding: theme.spacing.unit * 2,
  },

  questionCard: {
    margin: 0,
    backgroundColor: 'transparent',
    color: theme.palette.common.white,
    width: '100%',
    padding: `${theme.spacing.unit * 4}px`,
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
