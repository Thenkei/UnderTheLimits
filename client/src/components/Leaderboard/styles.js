export default theme => ({
  listHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 4}px ${theme.spacing.unit * 3}px`,
    width: '33%',
    margin: 'auto',
  },

  list: {
    padding: `0 ${theme.spacing.unit * 4}px`,
    margin: 'auto',
    width: '33%',
  },

  listItem: {
    borderBottom: `solid 1px ${theme.palette.primary.light}${theme.opacity.alpha35}`,

    '&:first-child': {
      borderTop: `solid 1px ${theme.palette.primary.light}${theme.opacity.alpha35}`,
    },
  },

  inline: {
    display: 'inline',
  },
});
