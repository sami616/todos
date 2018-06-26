import React, { Fragment as F } from 'react'
import { Query } from 'react-apollo'
import { getTodos } from '../../api/remote/todos/queries'
import { AddTodo } from './'
import { Todo } from './'

const Incomplete = props => (
  <F>
    <AddTodo />

    <br />
    <br />

    <Query query={getTodos.query}>
      {res => {
        if (res.loading) return <p>Loading</p>
        if (res.error) return <p>Error</p>
        const incomplete = res.data.todoes.filter(todo => !todo.completed)
        if (!incomplete.length) return <p>No todos</p>
        return incomplete.map(todo => <Todo key={todo.id} todo={todo} />)
      }}
    </Query>
  </F>
)

export default Incomplete
