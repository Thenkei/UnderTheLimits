export default theme => ({
  card: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    width: 175,
    minHeight: 230,
    maxHeight: 300,
    overflow: 'auto',
    margin: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px 0`,
    backfaceVisibility: 'hidden',
    transition: `all ${theme.transitions.easing.easeInOut} ${theme.transitions.duration.short}ms`,
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: '8px',
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.main,
    boxShadow: theme.shadows[1],
    wordWrap: 'break-word',
    cursor: 'pointer',
    willChange: 'transform',

    '&:hover': {
      transform: 'translate3d( 0, -6px, 0 )',
      boxShadow: theme.shadows[4],
    },
  },

  cardChecked: {
    border: '30px solid red',
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

});
