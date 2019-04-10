import { createMuiTheme } from '../components';

const UtlTheme = createMuiTheme({
  themeName: 'UtlTheme',
  palette: {
    primary: {
      main: '#ff00ff',
    },
    secondary: {
      light: '#0066ff',
      main: '#521B53',
      contrastText: '#ffcc00',
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: '"Raleway", serif',
    fontFamilyMonospaced: '"Source Code Pro", monospace',
  },
});

export default UtlTheme;
