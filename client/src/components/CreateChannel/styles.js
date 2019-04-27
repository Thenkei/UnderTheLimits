export default theme => ({

  createChanelDialogBckgrd: {
    backgroundImage: `radial-gradient( farthest-corner at 0% 50%, ${theme.palette.primary.main}, ${theme.palette.primary.dark} )`,
    width: '100%',
  },

  createChanelDialogTitle: {
    '& $h6': {
      fontSize: '28px',
    },
  },

  createChannelForm: {
    display: 'flex',
    flexDirection: 'column',
  },

  createChannelFormControl: {
    margin: `${theme.spacing.unit * 1.5}px 0}`,
  },

});
