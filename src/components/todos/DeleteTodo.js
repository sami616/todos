import React, { Fragment as F } from 'react'
import { Mutation } from 'react-apollo'
import { deleteTodo } from '../../api/remote/todos/mutations'

const DeleteTodo = ({ todo }) => (
  <Mutation
    {...deleteTodo}
    variables={deleteTodo.variables(todo)}
    optimisticResponse={deleteTodo.optimisticResponse(todo)}>
    {(deleteTodo, status) => (
      <F>
        <button onClick={deleteTodo}>Delete</button>
        {status.error && <p>There was a problem deleting your todo</p>}
      </F>
    )}
  </Mutation>
)

export default DeleteTodo
