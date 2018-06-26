import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { ApolloProvider } from 'react-apollo'
import client from './api/client'
import { BrowserRouter as Router } from 'react-router-dom'
ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
)
