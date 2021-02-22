import { createMuiTheme } from '@material-ui/core/styles'
declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    highlight: Palette['primary']
    lightBlack: Palette['primary']
  }
  interface PaletteOptions {
    highlight: PaletteOptions['primary']
    lightBlack: PaletteOptions['primary']
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
    lightBlack: {
      main: '#333333',
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
