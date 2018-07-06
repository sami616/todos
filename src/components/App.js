import React from 'react'
import { Todos } from './todos'
import { injectGlobal } from 'styled-components'

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400');

  * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0); 
  }

  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
  }
`

const App = () => <Todos />
export default App
