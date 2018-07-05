import React from 'react'
import { Complete } from './'
import { Incomplete } from './'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Header } from './'
import styled from 'styled-components'

const Todos = () => {
  return (
    <AppWrap>
      <Header />
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/incomplete" />} />
        <Route path="/incomplete" component={Incomplete} />
        <Route path="/complete" component={Complete} />
        <Route render={() => <p>404</p>} />
      </Switch>
    </AppWrap>
  )
}

export default Todos

const AppWrap = styled.div`
  padding: 20px;
`
