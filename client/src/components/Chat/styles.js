export default theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    width: theme.layout.chatWidth,
    height: '100%',
    maxHeight: `calc(100vh - ${theme.layout.topAppBarHeight})`,
    backgroundColor: 'rgba( 0, 0, 0, .2 )',
    boxShadow: '-10px 0 50px rgba( 0, 0, 0, .2 )',
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
  },

  fullMessage: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: theme.spacing.unit * 2,
  },

  sendedMessage: {
    width: '100%',
    cursor: 'default',
  },

  avatar: {
    backgroundColor: 'rgba(0, 0, 0, .25)',
    width: `calc(${theme.layout.avatarSize} + ${theme.spacing.unit}px)`,
    height: `calc(${theme.layout.avatarSize} + ${theme.spacing.unit}px)`,
    padding: theme.spacing.unit,
    marginRight: theme.spacing.unit / 2,
    border: `solid 1px ${theme.palette.primary.main}`,
  },

  text: {
    backgroundColor: 'rgba(0, 0, 0, .25)',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing.unit * 2,
    margin: `${-theme.spacing.unit * 2}px 0 0 ${-theme.spacing.unit * 2}px`,
    wordBreak: 'break-word',
  },

  isPlayer: {
    color: theme.palette.primary.light,
  },

  metaDate: {
    color: theme.palette.primary.dark,
    transition: `all ${theme.transitions.easing.easeInOut} ${theme.transitions.duration.short}ms`,

    '&:hover': {
      color: theme.palette.primary.light,
      opacity: 0.5,
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

});
