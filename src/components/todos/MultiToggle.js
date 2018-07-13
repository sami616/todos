import React from 'react'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import * as updateTodoStuff from '../../api/remote/todos/mutations/updateTodo'
import { ToasterConsumer } from '../toaster/context'

const MultiToggle = props => {
  const handleToggle = async (updateTodo, addToast) => {
    const selected = [...props.selected]
    const todos = [...props.todos]
    let oppLength = props.oppositeLength
    props.clearSelected()
    const promisesToAwait = []

    selected.forEach((todo, index) => {
      promisesToAwait.push(
        updateTodo({
          variables: updateTodoStuff.variables({
            id: todo.id,
            properties: {
              completed: !props.completed,
              position: oppLength
            }
          }),
          optimisticResponse: updateTodoStuff.optimisticResponse({
            ...todo,
            completed: !props.completed
          })
        })
      )
      oppLength++
    })

    const selectedIDs = selected.map(item => item.id)

    const filtered = props.todos.filter(
      propTodo => !selectedIDs.includes(propTodo.id)
    )

    filtered.forEach((todo, index) => {
      promisesToAwait.push(
        updateTodo({
          variables: updateTodoStuff.variables({
            id: todo.id,
            properties: {
              position: index
            }
          }),
          optimisticResponse: updateTodoStuff.optimisticResponse({
            ...todo,
            position: index
          })
        })
      )
    })

    try {
      await Promise.all(promisesToAwait)
    } catch (e) {
      props.setSelected(selected)
      addToast({
        type: 'error',
        msg: 'Problem moving todo'
      })
    }

    // try {
    //   await toggleManyTodos()
    // } catch (e) {
    //   props.setSelected(selected)
    //   addToast({
    //     type: 'error',
    //     msg: 'Whoops, there was a problem updating your todos'
    //   })
    // }
  }

  return (
    // <Mutation
    //   variables={updateManyTodos.variables({
    //     selected: props.selected,
    //     properties: { completed: !props.completed }
    //   })}
    //   mutation={updateManyTodos.mutation}
    //   update={(cache, data) =>
    //     updateManyTodos.update(cache, data, {
    //       selected: props.selected,
    //       properties: {
    //         completed: !props.completed
    //       }
    //     })
    //   }
    //   optimisticResponse={updateManyTodos.optimisticResponse({
    //     count: props.selected.length
    //   })}>
    //   {updateManyTodos =>
    props.selected.length !== 0 && (
      <ToasterConsumer>
        {toaster => (
          <Mutation mutation={updateTodoStuff.mutation}>
            {updateTodo => (
              <ToggleBtn
                onClick={() => {
                  handleToggle(updateTodo, toaster.actions.addToast)
                }}>
                Mark as {props.completed ? 'incomplete' : 'complete'}
              </ToggleBtn>
            )}
          </Mutation>
        )}
      </ToasterConsumer>
    )
    //   }
    // </Mutation>
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
