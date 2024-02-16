// Import Modules
import { createTheme } from '@mui/material/styles';

// Define Base Theme
const theme = createTheme({
  palette: {
    action: {
      disabledBackground: '#E4EBF5',
      disabled: '#AAB4C8'
    },
    primary: {
      main: '#0081EA',
      dark: '#0D92FF'
    },
    text: {
      primary: '#333',
      secondary: '#8C8C8C'
    },
    background: {
      default: 'linear-gradient(60deg, #039, #0CF)',
      paper: '#F7F7F7'
    }
  },
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
    fontSize: 14,
    fontWeightLight: 400,
    h1: {
      fontSize: 42,
      fontWeight: 700
    },
    h2: {
      fontSize: 36,
      fontWeight: 700
    },
    h3: {
      fontSize: 28,
      fontWeight: 700
    },
    h4: {
      fontSize: 24,
      fontWeight: 700
    },
    h5: {
      fontSize: 20,
      fontWeight: 700
    },
    h6: {
      fontSize: 16,
      fontWeight: 700
    }
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true
      }
    }
  }
});

// Export Base Theme
export default theme;
