import { createMuiTheme } from '@material-ui/core/styles'

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    lightBlack: Palette['primary']
    greyFont: Palette['primary']
    BgColor: Palette['primary']
  }
  interface PaletteOptions {
    lightBlack: PaletteOptions['primary']
    greyFont: PaletteOptions['primary']
    BgColor: PaletteOptions['primary']
  }
}

const customFont = {
  fontFamily: 'SeoulNamsanM',
  fontStyle: 'normal',
  fontWeight: 'normal',
  src: `
    url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/SeoulNamsanM.woff') format('woff')
  `,
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#6c1714',
    },
    secondary: {
      main: '#0070b8',
    },
    greyFont: {
      main: '#818181',
    },
    lightBlack: {
      main: '#333333',
      light: '#808080',
    },
    BgColor: {
      main: '#e4e4e4',
    },
  },
  typography: {
    fontFamily: 'SeoulNamsanM',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [customFont],
        body: {
          backgroundColor: '#e4e4e4',
          '& .MuiMenuItem-root': {
            fontSize: '14px',
            minHeight: 'auto',
            fontWeight: 500,
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
