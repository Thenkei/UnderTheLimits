export default () => ({
  chat: {
    display: 'flex',
    flexDirection: 'column',
    // width: $chat-width,
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgba( 0, 0, 0, .2 )',
    boxShadow: '-10px 0 50px rgba( 0, 0, 0, .2 )',
  },
  chatSendedMessages: {
    flex: '1 1 auto',
  },
  chatTopBar: {
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
  chatMessagesFlow: {
    height: '100%',
    borderRadius: '0',
    backgroundColor: 'transparent',
  },

  chatSendMessage: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '0',
    padding: '12px',
  },

  chatSendMessageInput: {
    backgroundColor: 'transparent',
  },

  chatSendMessageButton: {
    backgroundColor: 'transparent',
  },
});
