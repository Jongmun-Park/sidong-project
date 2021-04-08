import { createMuiTheme } from '@material-ui/core/styles'
declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    greyFont: Palette['primary']
    lightBlack: Palette['primary']
    lightGrey: Palette['primary']
  }
  interface PaletteOptions {
    greyFont: PaletteOptions['primary']
    lightBlack: PaletteOptions['primary']
    lightGrey: PaletteOptions['primary']
  }
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#6c1714',
      light: '#f0eadb',
    },
    greyFont: {
      main: '#818181',
    },
    lightBlack: {
      main: '#333333',
      light: '#808080',
    },
    lightGrey: {
      main: '#f5f6fa',
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          backgroundColor: '#f0eadb',
          '& .MuiMenuItem-root': {
            fontSize: '14px',
            minHeight: 'auto',
          },
          '& .MuiSelect-select.MuiSelect-select': {
            textAlign: 'center',
          },
        },
      },
    },
  },
})

export default theme
