import { createMuiTheme } from '@material-ui/core/styles'

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    lightBlack: Palette['primary']
    greyFont: Palette['primary']
    greyBackground: Palette['primary']
    beige: Palette['primary']
  }
  interface PaletteOptions {
    lightBlack: PaletteOptions['primary']
    greyFont: PaletteOptions['primary']
    greyBackground: PaletteOptions['primary']
    beige: PaletteOptions['primary']
  }
}

const ridiBatang = {
  fontFamily: 'RIDIBatang',
  fontStyle: 'normal',
  fontWeight: 'normal',
  src: `
    url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.0/RIDIBatang.woff') format('woff')
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
    greyBackground: {
      main: '#f5f6fa',
    },
    lightBlack: {
      main: '#333333',
      light: '#808080',
    },
    beige: {
      main: '#f0eadb',
      light: '#f7f5ed',
    },
  },
  typography: {
    fontFamily: 'RIDIBatang',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [ridiBatang],
        body: {
          backgroundColor: '#f0eadb',
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
