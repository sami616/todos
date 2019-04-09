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
          <form name="contact" method="post">
            <input type="hidden" name="form-name" value="contact" />
            <p>
              <label>
                Your Name: <input type="text" name="name" />
              </label>
            </p>
            <p>
              <label>
                Your Email: <input type="email" name="email" />
              </label>
            </p>
            <p>
              <label>
                Message: <textarea name="message" />
              </label>
            </p>
            <p>
              <button type="submit">Send</button>
            </p>
          </form>

          <App />
          <Toaster />
        </ToasterProvider>
      </ThemeProvider>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
)
