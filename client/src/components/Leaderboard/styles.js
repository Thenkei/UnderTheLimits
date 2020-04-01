export default theme => ({
  list: {
    padding: `0 ${theme.spacing.unit * 4}px`,
  },

  listItem: {
    borderBottom: `solid 1px ${theme.palette.primary.light}${theme.opacity.alpha35}`,

    '&:first-child': {
      borderTop: `solid 1px ${theme.palette.primary.light}${theme.opacity.alpha35}`,
    },
  },
});
