export default () => ({
  card: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    width: '175px',
    minHeight: '230px',
    margin: '15px',
    '-webkit-backface-visibility': 'hidden',
    backfaceVisibility: 'hidden',
    transition: 'all .235s ease 0s',
    border: '2px solid #e6e7e9',
    borderRadius: '8px',
    backgroundColor: 'white',
    boxShadow: '15px 28px 25px -18px rgba( 0, 0, 0, .25)',
    // color: $brand-'primary',
    fontSize: '14px',
    wordWrap: 'break-word',
    cursor: 'pointer',
    willChange: 'transform',
    '&:hover': {
      transform: 'translate3d( 0, -6px, 0 )',
      boxShadow: '2px 8px 8px -5px rgba( 0, 0, 0, .5 )',
    },
    '& .card-body': {
      flex: '1 1 auto',
      padding: '1.25rem',
    },
  },

});