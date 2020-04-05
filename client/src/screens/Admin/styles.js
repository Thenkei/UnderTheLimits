export default theme => ({
  listHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(4, 4, 3),
    width: '100%',
  },

  channelList: {
    padding: theme.spacing(0, 4),
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
    marginRight: theme.spacing(1),
  },

  channelListItemSecondary: {
    display: 'flex',
    alignItems: 'center',
  },

  channelListItemSecondaryIcon: {
    marginRight: theme.spacing(1),
    color: theme.palette.primary.light,
    opacity: 0.35,
  },
});
