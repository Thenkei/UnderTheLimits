import { createMuiTheme } from '../components';

const generateTheme = (themeName, palette) => {
  const opacity = {
    alpha00: '00',
    alpha10: '1A',
    alpha25: '40',
    alpha35: '59',
    alpha50: '80',
    alpha75: 'BF',
    alpha90: 'E6',
  };

  const headlinesStyle = {
    textTransform: 'uppercase',
    fontStyle: 'italic',
    textShadow: `0 0 0.2em ${palette.common.white}${opacity.alpha10}, 0 0 0.4em ${palette.primary.light}${opacity.alpha35}`,
  };

  return {
    themeName,

    opacity,

    layout: {
      topAppBarHeight: '64px',
      chatWidth: '312px',
      avatarSize: '40px',
    },

    palette,

    typography: {
      fontFamily: '"Raleway", serif',
      fontFamilyMonospaced: '"Source Code Pro", monospace',
      fontWeightMedium: '800',
      fontWeightRegular: '500',

      h1: headlinesStyle,
      h2: headlinesStyle,
      h3: headlinesStyle,
      h4: headlinesStyle,
      h5: headlinesStyle,
      h6: headlinesStyle,

      overline: {
        ...headlinesStyle,
        letterSpacing: 0.5,
      },

      button: headlinesStyle,
    },

    overrides: {
      // MuiButtonBase: {
      //   root: {
      //     zIndex: 1,
      //     position: 'relative',
      //     fontSize: 'inherit',
      //     overflow: 'hidden',

      //     '&::after': {
      //       content: '""',
      //       zIndex: -1,
      //       backgroundColor: 'hsla(0, 0%, 100%, 0.2)',
      //       position: 'absolute',
      //       top: '-50%',
      //       bottom: '-50%',
      //       left: '-100%',
      //       width: '1.25em',
      //       transform: 'translateX(-525%) rotate(35deg)',
      //     },

      //     '&:hover::after': {
      //       transition: 'all 0.45s ease-in-out',
      //       right: 0,
      //     },
      //   },
      // },
      MuiDialog: {
        paper: {
          border: `solid 1px ${palette.primary.light}${opacity.alpha10}`,
          backgroundImage: `radial-gradient( farthest-corner at 0% 50%, ${palette.primary.main}, ${palette.primary.dark} )`,
        },
      },
      MuiMenu: {
        paper: {
          backgroundColor: palette.primary.main,
          backgroundImage: `linear-gradient(141deg, ${palette.primary.main}, ${palette.primary.light}${opacity.alpha25} )`,
        },
      },
      MuiTooltip: {
        tooltip: {
          backgroundImage: `linear-gradient(141deg, ${palette.primary.dark}${opacity.alpha75}, ${palette.primary.dark}${opacity.alpha90} )`,
          backgroundColor: palette.primary.main,
          borderBottom: `solid 1px ${palette.primary.light}${opacity.alpha25}`,
          boxShadow: `0 0 2em ${palette.primary.light}${opacity.alpha10}`,
          opacity: 1,
          letterSpacing: 0.7,
          textTransform: 'uppercase',
          textShadow: `0 0 0.2em ${palette.common.white}${opacity.alpha10}, 0 0 0.4em ${palette.primary.light}${opacity.alpha35}`,
          fontWeight: 'bolder',
        },
      },
      MuiPopover: {
        paper: {
          border: `solid 1px ${palette.primary.light}${opacity.alpha10}`,
          backgroundColor: palette.primary.main,
          backgroundImage: `linear-gradient(141deg, ${palette.primary.main}, ${palette.primary.light}${opacity.alpha25} )`,
        },
      },
    },
  };
};

const mainPalette = {
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
};

// UTL Theme definitiion
const UtlTheme = createMuiTheme(generateTheme('UtlTheme', mainPalette));

const GameMasterTheme = createMuiTheme(generateTheme('UtlTheme', {
  ...mainPalette,
  primary: {
    light: '#2BBFFF',
    main: '#2e0e70',
    dark: '#031723',
    contrastText: '#fff',
  },
}));

export default {
  UtlTheme,
  GameMasterTheme,
};
