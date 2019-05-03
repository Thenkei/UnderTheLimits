export default theme => ({
  topAppBar: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    zIndex: '9',
    height: theme.layout.topAppBarHeight,
    padding: theme.spacing.unit * 2,
    overflow: 'visible',
    backgroundImage: `linear-gradient(141deg, ${theme.palette.primary.dark}${theme.opacity.alpha90}, ${theme.palette.primary.dark}${theme.opacity.alpha10} )`,
    backgroundColor: theme.palette.primary.main,
    boxShadow: '0 3px 6px rgba( 0, 0, 0, .16 ), 0 3px 6px rgba( 0, 0, 0, .23 )',
  },

  topAppBarLogo: {
    height: '62px',
    cursor: 'pointer',
    marginTop: '26px',
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
    padding: `0 ${theme.spacing.unit}px 0 ${theme.spacing.unit * 2}px`,
  },

  channelMainInfo: {
    textAlign: 'left',
    width: '100%',
    padding: `0 ${theme.spacing.unit * 2}px`,
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
      marginLeft: '12px',
      opacity: 1,
    },

    '80%': {
      marginLeft: '-4px',
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
    margin: `0 ${theme.spacing.unit * 2.5}px`,
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
    marginRight: theme.spacing.unit,
  },
});
