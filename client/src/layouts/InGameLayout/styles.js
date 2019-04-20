export default theme => ({

  inGameLayout: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
  },

  ingameLayoutMainContent: {
    flex: '1 1 auto',
    height: '100%',
    maxHeight: `calc( 100vh - ${theme.layout.topAppBarHeight} )`,
    overflow: 'auto',
  },

  sideBars: {
    height: '100%',
    maxHeight: `calc(100vh - ${theme.layout.topAppBarHeight})`,
    backgroundColor: `${theme.palette.primary.dark}${theme.opacity.alpha50}`,
    boxShadow: theme.shadows[16],
  },
});
