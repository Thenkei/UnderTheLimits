export default theme => ({
  listHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.spacing(4, 4, 3),
    width: '33%',
    margin: 'auto',
  },

  list: {
    padding: theme.spacing(0, 4),
    margin: 'auto',
    width: '33%',
  },

  listItem: {
    borderBottom: `solid 1px ${theme.palette.primary.light}${theme.opacity.alpha35}`,

    '&:first-child': {
      borderTop: `solid 1px ${theme.palette.primary.light}${theme.opacity.alpha35}`,
    },
  },
});
