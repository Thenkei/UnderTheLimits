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
    },
    secondary: {
      main: '#728697',
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: '"Raleway", serif',
    fontFamilyMonospaced: '"Source Code Pro", monospace',
  },
});

export default UtlTheme;
