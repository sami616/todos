import React from 'react'
import { Mutation } from 'react-apollo'
import * as deleteTodo from '../../api/remote/todos/mutations/deleteTodo'
import * as updateTodo from '../../api/remote/todos/mutations/updateTodo'
import { Icon } from 'react-icons-kit'
import { ic_delete } from 'react-icons-kit/md/ic_delete'
import styled from 'styled-components'
import { ToasterConsumer } from '../toaster/context'

const DeleteTodo = props => {
  const handleDelete = async (deleteTodo, updateIndex, addToast) => {
    const promisesToAwait = []

    promisesToAwait.push(deleteTodo())

    const filtered = props.todos.filter(
      propTodo => propTodo.id !== props.todo.id
    )

    filtered.forEach((todo, index) => {
      promisesToAwait.push(
        updateIndex({
          variables: updateTodo.variables({
            id: todo.id,
            properties: {
              position: index
            }
          }),
          optimisticResponse: updateTodo.optimisticResponse({
            ...todo,
            position: index
          })
        })
      )
    })

    try {
      await Promise.all(promisesToAwait)
    } catch (e) {
      addToast({
        type: 'error',
        msg: 'Problem moving todo'
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
        <Mutation mutation={updateTodo.mutation}>
          {updateIndex => (
            <ToasterConsumer>
              {toaster => (
                <Ico
                  onClick={() => {
                    handleDelete(
                      deleteTodo,
                      updateIndex,
                      toaster.actions.addToast
                    )
                  }}
                  icon={ic_delete}
                />
              )}
            </ToasterConsumer>
          )}
        </Mutation>
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
