export default theme => ({
  topAppBar: {
    display: 'flex',
    zIndex: '9',
    height: theme.layout.topAppBarHeight,
    padding: theme.spacing.unit * 2,
    overflow: 'visible',
    backgroundColor: theme.palette.primary.main,
    boxShadow: '0 3px 6px rgba( 0, 0, 0, .16 ), 0 3px 6px rgba( 0, 0, 0, .23 )',
  },

  topAppBarLogo: {
    height: '62px',
    filter: 'drop-shadow( 0 20px 30px rgba( #031723, t5 ) )',
  },
});
