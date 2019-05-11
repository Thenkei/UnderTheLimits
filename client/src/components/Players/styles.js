export default theme => ({
  root: {
    flexShrink: 0,
    maxHeight: `calc( 100vh - ${theme.layout.topAppBarHeight} )`,
    overflow: 'auto',
    height: '100%',
    display: 'flex',
    flexDirection: 'column-reverse',
  },

  // scoreBoardTopBar: {
  //   display: 'flex',
  //   alignItems: 'center',
  //   width: '100%',
  //   minHeight: '32px',
  //   marginBottom: '0',
  //   padding: '8px',
  //   background: 'linear-gradient( 45deg, rgba( #135c7e, .8 ), rgba( #082f48, .8 ) )',
  //   color: 'white',
  //   fontSize: '10px',
  //   fontWeight: 'bold',
  //   textTransform: 'uppercase',
  // },

  scorePositions: {
    height: 'auto',
    borderTop: `solid 1px ${theme.palette.primary.light}${theme.opacity.alpha25}`,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',

    '&:last-child $avatarZone': {
      paddingTop: '8px',
    },
  },

  scoreFiller: {
    height: '100%',
    flexShrink: 1,
    minHeight: 'auto',

    $coreNumbers: {
      minHeight: 'auto',
    },
  },

  scoreNumbers: {
    borderRight: `solid 1px ${theme.palette.primary.light}${theme.opacity.alpha25}`,
    display: 'flex',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit / 2}px`,
    backgroundColor: 'rgba(0, 0, 0, .25)',
    fontWeight: 'bold',
    width: '20px',
  },

  avatarZone: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing.unit / 2,
  },

});
