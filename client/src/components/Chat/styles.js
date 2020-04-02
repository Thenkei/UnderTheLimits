export default theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    width: theme.layout.chatWidth,
    height: '100%',
  },

  // Header

  topBar: {
    display: 'flex',
    flex: '0 0 auto',
    alignItems: 'center',
    width: '100%',
    minHeight: '32px',
    marginBottom: '0',
    padding: `0 ${theme.spacing.unit}px`,
    background: theme.palette.primary.main,
    color: 'white',
    fontSize: '10px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },

  topBarTitle: {
    fontWeight: 'bolder',
    color: theme.palette.common.white,
  },

  // Messages flow

  messagesFlow: {
    flex: '1 1 auto',
    height: '100%',
    padding: theme.spacing.unit,
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column-reverse',
  },

  fullMessage: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: theme.spacing.unit * 2,
    animationDuration: theme.transitions.duration.complex,
    animationTimingFunction: theme.transitions.easing.easeInOut,
    animationName: 'PoppinMessage',
  },

  fullMessageSystem: {
    marginLeft: '35px',
  },

  sendedMessage: {
    width: '100%',
    cursor: 'default',
  },

  playerName: {
    fontSize: '14px',
    marginBottom: theme.spacing.unit / 2,
  },

  avatar: {
    backgroundColor: theme.palette.primary.dark,
    width: `calc(${theme.layout.avatarSize} + ${theme.spacing.unit}px)`,
    height: `calc(${theme.layout.avatarSize} + ${theme.spacing.unit}px)`,
    padding: theme.spacing.unit,
    marginRight: theme.spacing.unit / 2,
    border: `solid 1px ${theme.palette.primary.main}`,
  },

  text: {
    backgroundColor: 'rgba(0, 0, 0, .25)',
    borderRadius: theme.shape.borderRadius,
    border: 'solid 1px',
    borderColor: `${theme.palette.primary.light}${theme.opacity.alpha35}`,
    padding: theme.spacing.unit * 2,
    margin: `${-theme.spacing.unit * 2}px 0 0 ${-theme.spacing.unit * 2}px`,
    wordBreak: 'break-word',
  },

  isPlayer: {
    color: theme.palette.primary.light,
  },

  isSystem: {
    color: 'red',
    borderColor: 'rgba(255, 0, 0, .35)',
    margin: '12px 0 0 0',
  },

  isInfo: {
    color: 'white',
    borderColor: 'rgba(34, 167, 240, .30)',
    margin: '12px 0 0 0',
  },

  isPrivate: {
    borderColor: 'transparent',
    color: 'rgba(255, 255, 255, .35)',
  },

  metaDate: {
    color: theme.palette.primary.dark,
    transition: `all ${theme.transitions.easing.easeInOut} ${theme.transitions.duration.short}ms`,

    '&:hover': {
      color: theme.palette.primary.light,
      opacity: 0.5,
    },
  },

  metaDateSystem: {
    marginLeft: '17px',
  },

  // Message animation

  '@keyframes PoppinMessage': {
    '0%': {
      marginBottom: 0,
    },

    '40%': {
      marginBottom: '12px',
    },

    '80%': {
      marginBottom: '-4px',
    },

    '99%': {
      marginBottom: 0,
    },
  },

  // Footer

  sendMessagesForm: {
    display: 'flex',
    flex: '0 0 auto',
    flexDirection: 'row',
    width: '100%',
    padding: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main,
  },

  sendMessageInput: {
    backgroundColor: 'rgba(0, 0, 0, .25)',
    borderRadius: theme.shape.borderRadius,
  },

  sendMessageInputType: {
    height: '100%',
    padding: theme.spacing.unit / 2,
    lineHeight: '140%',
  },

  sendMessageButton: {
    backgroundColor: 'transparent',
  },

  playersPopover: {
    '&:before': {
      background: theme.palette.primary.main,
    },
  },
});
