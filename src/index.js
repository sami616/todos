import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { ApolloProvider } from 'react-apollo'
import client from './api/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToasterProvider } from './components/toaster/context'
import { Toaster } from './components/toaster'
import { ThemeProvider } from 'styled-components'
import theme from './theme'

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <ThemeProvider theme={theme}>
        <ToasterProvider>
          <App />
          <Toaster />
        </ToasterProvider>
      </ThemeProvider>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
)
