export default theme => ({
  topAppBar: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    zIndex: 9,
    height: theme.layout.topAppBarHeight,
    padding: theme.spacing(2),
    overflow: 'visible',
    backgroundImage: `linear-gradient(141deg, ${theme.palette.primary.dark}${theme.opacity.alpha90}, ${theme.palette.primary.dark}${theme.opacity.alpha10} )`,
    backgroundColor: theme.palette.primary.main,
    boxShadow: '0 3px 6px rgba( 0, 0, 0, .16 ), 0 3px 6px rgba( 0, 0, 0, .23 )',
  },

  homePage: {
    background: 'none',
    boxShadow: 'none',
  },

  topAppBarLogo: {
    width: 140,
    cursor: 'pointer',
    marginTop: 38,
    zIndex: 9,
  },

  topAppBarButtonContainer: {
    marginLeft: 'auto',
    flexShrink: 0,
  },

  soundActivated: {
    color: 'white',
    textShadow: '0 0 0.2em #FFFFFF1A, 0 0 0.4em #2BBFFF59',
  },

  channelInfosContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing(0, 0, 2),
  },

  channelMainInfo: {
    textAlign: 'left',
    width: '100%',
    padding: theme.spacing(0, 2),
    animationDuration: theme.transitions.duration.complex,
    animationTimingFunction: theme.transitions.easing.easeInOut,
    animationName: 'MainInfoApparition',
  },

  '@keyframes MainInfoApparition': {
    '0%': {
      marginLeft: 0,
      opacity: 0,
    },

    '40%': {
      marginLeft: 12,
      opacity: 1,
    },

    '80%': {
      marginLeft: -4,
    },

    '99%': {
      marginLeft: 0,
    },
  },

  channelSecondaryInfos: {
    display: 'flex',
    flexDirection: 'row',
    flexShrink: 0,
    alignItems: 'center',
    height: '100%',
    marginLeft: 'auto',
  },

  timerTextSeparator: {
    margin: theme.spacing(0, 2.5),
    fontStyle: 'normal',
  },

  channelNameContainer: {
    display: 'flex',
    flexDirection: 'column',
  },

  channelNameOverline: {
    textAlign: 'right',
    lineHeight: 'normal',
  },

  channelName: {
    textAlign: 'right',
    lineHeight: 'normal',
    marginRight: theme.spacing(1),
  },

  timerProgress: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 4,
    backgroundColor: theme.palette.primary.dark,
  },

  timerProgressBar: {
    backgroundColor: theme.palette.primary.dark,
    backgroundImage: `linear-gradient(to right, ${theme.palette.secondary.main}${theme.opacity.alpha00} 0px, ${theme.palette.secondary.main} 300px)`,
  },

  timerProgressDashed: {
    backgroundImage: 'none',
    backgroundSize: 200,
    backgroundColor: `${theme.palette.secondary.main}${theme.opacity.alpha35}`,
  },
});
