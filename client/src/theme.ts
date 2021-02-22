import { createMuiTheme } from '@material-ui/core/styles'
declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    highlight: Palette['primary']
  }
  interface PaletteOptions {
    highlight: PaletteOptions['primary']
  }
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#6c1714',
    },
    highlight: {
      main: '#FEA47F',
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          backgroundColor: '#f0eadb',
        },
      },
    },
  },
})

export default theme
