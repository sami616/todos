import React, { Fragment as F } from 'react'
import { ToggleTodo } from './'
import { Checkbox } from './'
import { PromptEdit } from './'
import { DeleteTodo } from './'
import styled from 'styled-components'

const Todo = props => {
  const isAdded = () => {
    if (props.todo.id.indexOf('temp_id') === -1) {
      return true
    }
    return false
  }

  const isSelected = () => {
    if (props.selected) {
      if (props.selected.includes(props.todo.id)) {
        return true
      }
      return false
    }
  }

  return (
    <Item>
      <span>{props.todo.title}</span>
      <Actions>
        {isAdded() &&
          !isSelected() && (
            <F>
              <ToggleTodo todo={props.todo} />
              {props.todo.completed ? (
                <DeleteTodo todo={props.todo} />
              ) : (
                <PromptEdit todo={props.todo} />
              )}
            </F>
          )}
        {!isAdded() && ' Adding todo'}
        {isAdded() && (
          <Checkbox
            isSelected={isSelected}
            toggleSelected={props.toggleSelected}
            todo={props.todo}
          />
        )}
      </Actions>
    </Item>
  )
}

export default Todo

const Actions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 0 10px;
`

const Item = styled.div`
  span {
    line-height: 25px;
    font-weight: 300;
  }
  min-height: 80px;
  padding: 20px 0;
  border-bottom: 1px solid #e4e4e4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  color: ${props => props.theme.primaryColor};
`
