import React from 'react'
import { Mutation } from 'react-apollo'
import * as updateTodo from '../../api/remote/todos/mutations/updateTodo'
import { Icon } from 'react-icons-kit'
import { ic_done } from 'react-icons-kit/md/ic_done'
import { ic_settings_backup_restore } from 'react-icons-kit/md/ic_settings_backup_restore'
import styled from 'styled-components'
import { ToasterConsumer } from '../toaster/context'

const ToggleTodo = props => {
  const handleToggle = async (updateTodo, addToast) => {
    try {
      await updateTodo()
    } catch (e) {
      addToast({
        type: 'error',
        msg: 'Whoops, there was a problem moving your todos'
      })
    }
  }

  return (
    <Mutation
      mutation={updateTodo.mutation}
      variables={updateTodo.variables({
        id: props.todo.id,
        properties: { completed: !props.todo.completed }
      })}
      optimisticResponse={updateTodo.optimisticResponse({
        title: props.todo.title,
        id: props.todo.id,
        completed: !props.todo.completed
      })}>
      {updateTodo => (
        <ToasterConsumer>
          {toaster =>
            props.todo.completed ? (
              <Ico
                completed={`${props.todo.completed}`}
                onClick={() => {
                  handleToggle(updateTodo, toaster.actions.addToast)
                }}
                icon={ic_settings_backup_restore}
              />
            ) : (
              <Ico
                completed={`${props.todo.completed}`}
                onClick={() => {
                  handleToggle(updateTodo, toaster.actions.addToast)
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
