import React, { Fragment as F } from 'react'
import { Query, Mutation } from 'react-apollo'
import { getDrawer } from '../api/client/drawer/queries'
import { toggleDrawer } from '../api/client/drawer/mutations'
import { Todos } from './todos'

const App = props => (
  <F>
    <Todos />

    <Mutation mutation={toggleDrawer.mutation}>
      {toggleDrawer => <button onClick={toggleDrawer}>Toggle</button>}
    </Mutation>

    <Query query={getDrawer.query}>
      {({ data }) => (data.drawer.open ? 'Drawer Open' : 'Drawer Closed')}
    </Query>
  </F>
)

export default App
