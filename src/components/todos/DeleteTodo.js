import React from 'react'
import { Mutation } from 'react-apollo'
import * as deleteTodo from '../../api/remote/todos/mutations/deleteTodo'
import { Icon } from 'react-icons-kit'
import { ic_delete } from 'react-icons-kit/md/ic_delete'
import styled from 'styled-components'
import { ToasterConsumer } from '../toaster/context'

const DeleteTodo = props => {
  const handleDelete = async (deleteTodo, addToast) => {
    try {
      await deleteTodo()
    } catch (e) {
      addToast({
        type: 'error',
        msg: 'Whoops, there was a problem deleting your todos'
      })
    }
  }

  return (
    <Mutation
      mutation={deleteTodo.mutation}
      update={deleteTodo.update}
      variables={deleteTodo.variables(props.todo)}
      optimisticResponse={deleteTodo.optimisticResponse(props.todo)}>
      {deleteTodo => (
        <ToasterConsumer>
          {toaster => (
            <Ico
              onClick={() => {
                handleDelete(deleteTodo, toaster.actions.addToast)
              }}
              icon={ic_delete}
            />
          )}
        </ToasterConsumer>
      )}
    </Mutation>
  )
}

export default DeleteTodo

const Ico = styled(Icon).attrs({
  size: 20
})`
  margin: 5px;
  cursor: pointer;
  color: #ff4b4b;
`
