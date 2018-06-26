import React, { Fragment as F } from 'react'
import { ToggleTodo } from './'
import { DeleteTodo } from './'

const Todo = props => {
  return (
    <p>
      {props.todo.title} <ToggleTodo {...props} />
      {props.todo.completed && <DeleteTodo {...props} />}
    </p>
  )
}

export default Todo
