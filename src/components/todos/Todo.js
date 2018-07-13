import React, { Fragment as F } from 'react'
import { ToggleTodo } from './'
import { Checkbox } from './'
import { PromptEdit } from './'
import { DeleteTodo } from './'
import styled from 'styled-components'
import { SortableElement } from 'react-sortable-hoc'

const Todo = props => {
  const isAdded = () => {
    if (props.todo.id.indexOf('temp_id') === -1) {
      return true
    }
    return false
  }

  const isSelected = () => {
    if (props.selected) {
      if (props.selected.filter(obj => obj.id === props.todo.id).length > 0) {
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
              <ToggleTodo
                oppositeLength={props.oppositeLength}
                todo={props.todo}
                todos={props.todos}
              />
              {props.todo.completed ? (
                <DeleteTodo todo={props.todo} todos={props.todos} />
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

export default SortableElement(Todo)

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
    user-select: none;
  }
  min-height: 80px;
  padding: 20px;
  border-bottom: 1px solid #e4e4e4;
  display: flex;
  cursor: pointer;
  background: #fff;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  color: ${props => props.theme.primaryColor};
`
