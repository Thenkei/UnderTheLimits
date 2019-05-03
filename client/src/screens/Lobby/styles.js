export default theme => ({
  listHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 4}px ${theme.spacing.unit * 3}px`,
    width: '100%',
  },

  channelList: {
    padding: `0 ${theme.spacing.unit * 4}px`,
  },

  channelListItem: {
    borderBottom: `solid 1px ${theme.palette.primary.light}${theme.opacity.alpha35}`,

    '&:first-child': {
      borderTop: `solid 1px ${theme.palette.primary.light}${theme.opacity.alpha35}`,
    },
  },

  channelListItemName: {
    display: 'flex',
    alignItems: 'center',
  },

  channelListItemIcon: {
    marginRight: theme.spacing.unit,
  },

  channelListItemSecondary: {
    display: 'flex',
    alignItems: 'center',
  },

  channelListItemSecondaryIcon: {
    marginRight: theme.spacing.unit,
    color: theme.palette.primary.light,
    opacity: 0.35,
  },
});
