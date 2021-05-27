import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'


// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#cc4444',
    },
    error: {
      main: red.A400,
    },
    gray: {
      light: '#EEEEEE',
      main: '#888888',
      dark: '#212121',
      contrastText: '#5a5a5a',
    },
    background: {
      default: '#f5f5f5',
    },
  },
})

export default theme
