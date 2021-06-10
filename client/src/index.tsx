import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from '@apollo/react-hooks'
import { createUploadLink } from 'apollo-upload-client'
import { setContext } from 'apollo-link-context'
import React from 'react'
import { render, hydrate } from 'react-dom'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './theme'
import App from './Components/App'
import { CurrentUserProvider } from './Hooks/User'

const link = createUploadLink({
  uri: process.env.REACT_APP_API_URI + '/graphql',
})

const authLink = setContext((_, { headers }) => {
  const token = sessionStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
  connectToDevTools: true,
})

const BaseApp = () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CurrentUserProvider>
        <App />
      </CurrentUserProvider>
    </ThemeProvider>
  </ApolloProvider>
)

const rootElement = document.getElementById('root')

if (rootElement?.hasChildNodes()) {
  console.log('hydrate!')
  hydrate(<BaseApp />, rootElement)
} else {
  console.log('render!')
  render(<BaseApp />, rootElement)
}

// render(<BaseApp />, document.getElementById('root'))
