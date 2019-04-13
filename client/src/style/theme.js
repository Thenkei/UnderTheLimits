import { createMuiTheme } from '../components';

const UtlTheme = createMuiTheme({
  themeName: 'UtlTheme',
  layout: {
    topAppBarHeight: '64px',
    chatWidth: '312px',
  },
  palette: {
    primary: {
      main: '#172736',
      dark: '#000f1e',
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
