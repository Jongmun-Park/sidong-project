import { createMuiTheme } from '@material-ui/core/styles'
declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    greyFont: Palette['primary']
    lightBlack: Palette['primary']
    lightYellow: Palette['primary']
  }
  interface PaletteOptions {
    greyFont: PaletteOptions['primary']
    lightBlack: PaletteOptions['primary']
    lightYellow: PaletteOptions['primary']
  }
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#6c1714',
    },
    greyFont: {
      main: '#818181',
    },
    lightBlack: {
      main: '#333333',
      light: '#808080',
    },
    lightYellow: {
      main: '#f0eadb',
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          backgroundColor: '#f0eadb',
          '& .MuiMenuItem-root': {
            fontSize: '12px',
          },
        },
      },
    },
  },
})

export default theme
