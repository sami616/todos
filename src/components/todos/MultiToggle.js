import React from 'react'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import * as updateManyTodos from '../../api/remote/todos/mutations/updateManyTodos'
import * as updateTodo from '../../api/remote/todos/mutations/updateTodo'
import { ToasterConsumer } from '../toaster/context'

const MultiToggle = props => {
  const handleToggle = async (toggleManyTodos, addToast) => {
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

  // const toggleTodo = id => {
  //   return (
  //     <Mutation
  //       mutation={updateTodo.mutation}
  //       variables={updateTodo.variables({
  //         id: id,
  //         properties: {
  //           completed: !props.completed,
  //           position: props.todo.position
  //         }
  //       })}
  //       optimisticResponse={updateTodo.optimisticResponse({
  //         ...props.todo,
  //         completed: !props.todo.completed,
  //         position: props.todo.position
  //       })}>
  //       {updateTodo => updateTodo()}
  //     </Mutation>
  //   )
  // }

  // return props.selected.length !== 0 ? (
  //   <ToggleBtn
  //     onClick={() => {
  //       props.selected.map(id => toggleTodo(id))
  //     }}>
  //     Mark as {props.completed ? 'incomplete' : 'complete'}
  //   </ToggleBtn>
  // ) : null

  return (
    <Mutation
      variables={updateManyTodos.variables({
        selected: props.selected,
        properties: { completed: !props.completed }
      })}
      mutation={updateManyTodos.mutation}
      update={(cache, data) =>
        updateManyTodos.update(cache, data, {
          ids: props.selected,
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
              <ToggleBtn
                onClick={() => {
                  handleToggle(updateManyTodos, toaster.actions.addToast)
                }}>
                Mark as {props.completed ? 'incomplete' : 'complete'}
              </ToggleBtn>
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
  outline: none
  margin: 20px 0 0 5px;
  color: orange;
  &:hover {
    background: orange;
    color: #fff;
  }
`
