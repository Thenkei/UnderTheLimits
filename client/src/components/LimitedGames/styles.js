const animationCardDelay = 0.12;

export default theme => ({
  cardGame: {
    opacity: 0,
  },

  cardsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignContent: 'flex-start',
    width: '100%',
    padding: 20,
    overflow: 'auto',
    backgroundColor: `${theme.palette.primary.dark}${theme.opacity.alpha50}`,
    height: '100%',

    '& > $cardGame': {
      '&:nth-of-type(2)': {
        animationDelay: `${animationCardDelay * 1}s`,
      },

      '&:nth-of-type(3)': {
        animationDelay: `${animationCardDelay * 2}s`,
      },

      '&:nth-of-type(4)': {
        animationDelay: `${animationCardDelay * 3}s`,
      },

      '&:nth-of-type(5)': {
        animationDelay: `${animationCardDelay * 4}s`,
      },

      '&:nth-of-type(6)': {
        animationDelay: `${animationCardDelay * 5}s`,
      },

      '&:nth-of-type(7)': {
        animationDelay: `${animationCardDelay * 6}s`,
      },

      '&:nth-of-type(8)': {
        animationDelay: `${animationCardDelay * 7}s`,
      },

      '&:nth-of-type(9)': {
        animationDelay: `${animationCardDelay * 8}s`,
      },

      '&:nth-of-type(10)': {
        animationDelay: `${animationCardDelay * 9}s`,
      },
    },

  },

  game: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
});
