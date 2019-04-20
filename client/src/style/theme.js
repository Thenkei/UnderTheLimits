import { createMuiTheme } from '../components';

const UtlTheme = createMuiTheme({
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
