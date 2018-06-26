import React from 'react'
import { Query } from 'react-apollo'
import { getTodos } from '../../api/remote/todos/queries'
import { Todo } from './'

const Complete = props => (
  <Query query={getTodos.query}>
    {res => {
      if (res.loading) return <p>Loading</p>
      if (res.error) return <p>Error</p>
      const complete = res.data.todoes.filter(todo => todo.completed)
      if (!complete.length) return <p>No todos</p>
      return complete.map(todo => <Todo key={todo.id} todo={todo} />)
    }}
  </Query>
)

export default Complete
