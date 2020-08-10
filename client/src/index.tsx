import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

import React from 'react'
import { render } from 'react-dom'

import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import theme from './theme'
import App from './Components/App'

// TODO: Cookies.get('csrftoken')
const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql/',
  request: (operation) => {
    const token = sessionStorage.getItem('token')
    if (token) {
      operation.setContext({
        headers: {
          authorization: `JWT ${token}`,
        },
      })
    }
  },
})

const BaseApp = () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </ApolloProvider>
)

render(<BaseApp />, document.getElementById('root'))
