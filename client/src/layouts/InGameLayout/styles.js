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

  // @Damien - Sorry for this part
  scoreBoard: {
    width: '120px',
    flexShrink: 0,
    height: '100%',
    maxHeight: `calc( 100vh - ${theme.layout.topAppBarHeight} )`,
    overflow: 'auto',
    backgroundColor: 'rgba( 0, 0, 0, .2 )',
    boxShadow: '-10px 0 50px rgba( 0, 0, 0, .2 )',
    border: 'solid 1px magenta',
  },

  scoreBoardTopBar: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    minHeight: '32px',
    marginBottom: '0',
    padding: '8px',
    background: 'linear-gradient( 45deg, rgba( #135c7e, .8 ), rgba( #082f48, .8 ) )',
    color: 'white',
    fontSize: '10px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
