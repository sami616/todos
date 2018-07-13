import React from 'react'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import * as updateManyTodos from '../../api/remote/todos/mutations/updateManyTodos'
import * as updateTodo from '../../api/remote/todos/mutations/updateTodo'
import { ToasterConsumer } from '../toaster/context'

const MultiToggle = props => {
  const handleToggle = async (toggleManyTodos, updateIndex, addToast) => {
    const selected = [...props.selected]
    props.clearSelected()
    try {
      await toggleManyTodos()
    } catch (e) {
      props.setSelected(selected)
      addToast({
        type: 'error',
        msg: 'Whoops, there was a problem updating your todos'
      })
    }
  }

  return (
    <Mutation
      variables={updateManyTodos.variables({
        selected: props.selected,
        properties: { completed: !props.completed }
      })}
      mutation={updateManyTodos.mutation}
      update={(cache, data) =>
        updateManyTodos.update(cache, data, {
          selected: props.selected,
          properties: {
            completed: !props.completed
          }
        })
      }
      optimisticResponse={updateManyTodos.optimisticResponse({
        count: props.selected.length
      })}>
      {updateManyTodos =>
        props.selected.length !== 0 && (
          <ToasterConsumer>
            {toaster => (
              <Mutation mutation={updateTodo.mutation}>
                {updateIndex => (
                  <ToggleBtn
                    onClick={() => {
                      handleToggle(
                        updateManyTodos,
                        updateIndex,
                        toaster.actions.addToast
                      )
                    }}>
                    Mark as {props.completed ? 'incomplete' : 'complete'}
                  </ToggleBtn>
                )}
              </Mutation>
            )}
          </ToasterConsumer>
        )
      }
    </Mutation>
  )
}

export default MultiToggle

const ToggleBtn = styled.button`
  background: #fff;
  margin: 20px 0 0 0;
  float: right;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 4px;
  font-size: 16px;
  border: 1px solid orange;
  outline: none;
  margin: 20px 0 0 5px;
  color: orange;
  &:hover {
    background: orange;
    color: #fff;
  }
`
