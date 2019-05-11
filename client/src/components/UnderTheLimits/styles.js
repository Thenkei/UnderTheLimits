export default theme => ({
  cardsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    padding: '20px',
    overflow: 'auto',
    backgroundColor: `${theme.palette.primary.dark}${theme.opacity.alpha50}`,
    height: '100%',
  },

  // cardsContainerQuestion: {
  //   display: 'flex',
  //   flexWrap: 'wrap',
  //   justifyContent: 'center',
  //   width: '100%',
  //   padding: '20px',
  //   marginTop: '80px',
  //   borderBottom: 'solid 1px rgba( 255, 255, 255, .25 )',
  // },

  game: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
});
