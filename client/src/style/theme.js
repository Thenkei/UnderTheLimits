import { createMuiTheme } from '../components';

const UtlTheme = createMuiTheme({
  themeName: 'UtlTheme',

  layout: {
    topAppBarHeight: '64px',
    chatWidth: '312px',
    avatarSize: '40px',
  },

  palette: {
    primary: {
      light: '#2BBFFF',
      main: '#0E4A70',
      dark: '#031723',
      contrastText: '#fff',
    },
    secondary: {
      main: '#728697',
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
  },
});

export default UtlTheme;
