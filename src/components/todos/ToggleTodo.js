import React from 'react'
import { Mutation } from 'react-apollo'
import * as updateTodo from '../../api/remote/todos/mutations/updateTodo'
import { Icon } from 'react-icons-kit'
import { ic_done } from 'react-icons-kit/md/ic_done'
import { ic_settings_backup_restore } from 'react-icons-kit/md/ic_settings_backup_restore'
import styled from 'styled-components'
import { ToasterConsumer } from '../toaster/context'

const ToggleTodo = props => {
  const handleToggle = async (toggleTodo, addToast) => {
    const promisesToAwait = []

    promisesToAwait.push(
      toggleTodo({
        variables: updateTodo.variables({
          id: props.todo.id,
          properties: {
            completed: !props.todo.completed,
            position: props.oppositeLength
          }
        }),
        optimisticResponse: updateTodo.optimisticResponse({
          ...props.todo,
          completed: !props.todo.completed,
          position: props.oppositeLength
        })
      })
    )

    const filtered = props.todos
      .filter(propTodo => propTodo.id !== props.todo.id)
      .reverse()

    filtered.forEach((todo, index) => {
      promisesToAwait.push(
        toggleTodo({
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
    <Mutation mutation={updateTodo.mutation}>
      {toggleTodo => (
        <ToasterConsumer>
          {toaster =>
            props.todo.completed ? (
              <Ico
                completed={`${props.todo.completed}`}
                onClick={() => {
                  handleToggle(toggleTodo, toaster.actions.addToast)
                }}
                icon={ic_settings_backup_restore}
              />
            ) : (
              <Ico
                completed={`${props.todo.completed}`}
                onClick={() => {
                  handleToggle(toggleTodo, toaster.actions.addToast)
                }}
                icon={ic_done}
              />
            )
          }
        </ToasterConsumer>
      )}
    </Mutation>
  )
}

export default ToggleTodo

const Ico = styled(Icon).attrs({
  size: 25
})`
  margin: 5px;
  cursor: pointer;
  color: ${props =>
    props.completed === 'true' ? '#cccccc' : props.theme.secondaryColor};
`
