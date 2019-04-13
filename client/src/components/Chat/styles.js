export default theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: theme.layout.chatWidth,
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgba( 0, 0, 0, .2 )',
    boxShadow: '-10px 0 50px rgba( 0, 0, 0, .2 )',
  },

  // Header

  topBar: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    minHeight: '32px',
    marginBottom: '0',
    padding: '8px',
    background: 'linear-gradient( 45deg, #135c7ecc, #082f48cc )',
    color: 'white',
    fontSize: '10px',
    fonWeight: 'bold',
    textTransform: 'uppercase',
  },

  // Messages flow

  messagesFlow: {
    flex: '1 1 auto',
  },

  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: theme.spacing.unit * 2,
  },

  sendedMessage: {
    width: '100%',
    color: '#2ABFFE',
    // marginTop: theme.spacing.unit * 3,
  },

  avatar: {
    backgroundColor: 'rgba(0, 0, 0, .25)',
    padding: theme.spacing.unit / 2,
  },

  text: {
    backgroundColor: 'rgba(0, 0, 0, .25)',
    borderRadius: '6px',
    padding: theme.spacing.unit * 2,
    marginTop: -theme.spacing.unit * 2,
  },

  metaDate: {
    color: '#2ABFFE',
  },

  // Footer

  sendMessagesForm: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '0',
    padding: '12px',
  },

  sendMessageInput: {
    backgroundColor: 'transparent',
  },

  sendMessageButton: {
    backgroundColor: 'transparent',
  },

});
