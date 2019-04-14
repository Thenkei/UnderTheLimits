export default theme => ({
  card: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    width: '175px',
    minHeight: '230px',
    margin: '15px',
    backfaceVisibility: 'hidden',
    transition: `all ${theme.transitions.easing.easeInOut} ${theme.transitions.duration.short}ms`,
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: '8px',
    backgroundColor: 'white',
    boxShadow: '15px 28px 25px -18px rgba( 0, 0, 0, .25)',
    color: theme.palette.primary.main,
    fontSize: '14px',
    wordWrap: 'break-word',
    cursor: 'pointer',
    willChange: 'transform',

    '&:hover': {
      transform: 'translate3d( 0, -6px, 0 )',
      boxShadow: '2px 8px 8px -5px rgba( 0, 0, 0, .5 )',
    },
  },

  cardBody: {
    flex: '1 1 auto',
    padding: theme.spacing.unit * 2,
  },

});
