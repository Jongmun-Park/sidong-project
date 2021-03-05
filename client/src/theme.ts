import { createMuiTheme } from '@material-ui/core/styles'
declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    greyFont: Palette['primary']
    lightBlack: Palette['primary']
  }
  interface PaletteOptions {
    greyFont: PaletteOptions['primary']
    lightBlack: PaletteOptions['primary']
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
