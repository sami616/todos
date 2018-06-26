import React, { Fragment as F } from 'react'
import { Mutation } from 'react-apollo'
import { toggleTodo } from '../../api/remote/todos/mutations'

const ToggleTodo = ({ todo }) => (
  <Mutation
    {...toggleTodo}
    variables={toggleTodo.variables(todo)}
    optimisticResponse={toggleTodo.optimisticResponse(todo)}>
    {(updateTodo, status) => (
      <F>
        <button onClick={updateTodo}>{todo.completed ? '↶' : '↷'}</button>
        {status.error && <p>There was a problem moving your todo</p>}
      </F>
    )}
  </Mutation>
)

export default ToggleTodo
