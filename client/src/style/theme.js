import { createMuiTheme } from '../components';

const headlinesStyle = {
  textTransform: 'uppercase',
  fontStyle: 'italic',
  textShadow: '0 0 0.2em #FFFFFF1A, 0 0 0.4em #2BBFFF59',
};


const UtlTheme = createMuiTheme({

  h1: {
    extend: headlinesStyle,
  },

  h2: {
    extend: headlinesStyle,
  },

  h3: {
    extend: headlinesStyle,
  },

  h4: {
    extend: headlinesStyle,
  },

  h5: {
    extend: headlinesStyle,
  },

  h6: {
    extend: headlinesStyle,
  },

  themeName: 'UtlTheme',

  opacity: {
    alpha10: '1A',
    alpha25: '40',
    alpha35: '59',
    alpha50: '80',
    alpha75: 'BF',
    alpha90: 'E6',
  },

  layout: {
    topAppBarHeight: '64px',
    chatWidth: '312px',
    avatarSize: '40px',
  },

  palette: {
    common: {
      white: '#ffffff',
      black: '#000000',
    },

    primary: {
      light: '#2BBFFF',
      main: '#0E4A70',
      dark: '#031723',
      contrastText: '#fff',
    },
    secondary: {
      light: '#c11400',
      main: '#980f00',
      dark: '#3b0e0f',
    },
    text: {
      primary: 'rgba(255, 255, 255, 0.87)',
      secondary: 'rgba(255, 255, 255, 0.54)',
      disabled: 'rgba(255, 255, 255, 0.38)',
      hint: 'rgba(255, 255, 255, 0.38)',
    },
  },

  typography: {
    useNextVariants: true,
    fontFamily: '"Raleway", serif',
    fontFamilyMonospaced: '"Source Code Pro", monospace',
    fontWeightMedium: '800',
    fontWeightRegular: '500',

    h1: {
      extend: headlinesStyle,
    },

    h2: {
      extend: headlinesStyle,
    },

    h3: {
      extend: headlinesStyle,
    },

    h4: {
      extend: headlinesStyle,
    },

    h5: {
      extend: headlinesStyle,
    },

    h6: {
      extend: headlinesStyle,
    },

    headlines: {
      textTransform: 'uppercase',
      fontStyle: 'italic',
      textShadow: '0 0 0.2em #FFFFFF1A, 0 0 0.4em #2BBFFF59',
    },

    overline: {
      headlinesStyle,
      letterSpacing: 0.5,
    },
  },

  overrides: {
    MuiTypography: {
      'h1, h2, h3, h4, h5, h6': {
        textTransform: 'uppercase',
        fontStyle: 'italic',
        textShadow: '0 0 0.2em #FFFFFF1A, 0 0 0.4em #2BBFFF59',
      },
    },
  },

  '@global': {
    'h1, h2, h3, h4, h5, h6': {
      textTransform: 'uppercase',
      fontStyle: 'italic',
      textShadow: '0 0 0.2em #FFFFFF1A, 0 0 0.4em #2BBFFF59',
    },
  },

  // overrides: {
  //   MuiMenuItem: {
  //     backgroundColor: 'magenta',
  //   },
  // },
});

export default UtlTheme;
