import React from 'react'
import { Mutation } from 'react-apollo'
import * as deleteManyTodos from '../../api/remote/todos/mutations/deleteManyTodos'
import * as updateTodo from '../../api/remote/todos/mutations/updateTodo'
import { ToasterConsumer } from '../toaster/context'
import { FormDiv } from './'

const MultiDelete = props => {
  const handleDelete = async (deleteManyTodos, updateIndex, addToast) => {
    const selected = [...props.selected]
    props.clearSelected()
    props.close()

    const promisesToAwait = []
    promisesToAwait.push(deleteManyTodos())

    const selectedIDs = selected.map(item => item.id)

    const filtered = props.todos.filter(
      propTodo => !selectedIDs.includes(propTodo.id)
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
      props.setSelected(selected)
      addToast({
        type: 'error',
        msg: 'Problem deleteing your todo'
      })
    }
  }

  return (
    <Mutation
      mutation={deleteManyTodos.mutation}
      update={(cache, data) =>
        deleteManyTodos.update(cache, data, { selected: props.selected })
      }
      variables={deleteManyTodos.variables({ selected: props.selected })}
      optimisticResponse={deleteManyTodos.optimisticResponse({
        count: props.selected.length
      })}>
      {deleteManyTodos => (
        <ToasterConsumer>
          {toaster => (
            <FormDiv>
              <h2>Delete selected todos?</h2>
              <Mutation mutation={updateTodo.mutation}>
                {updateIndex => (
                  <button
                    className="blue"
                    onClick={() => {
                      handleDelete(
                        deleteManyTodos,
                        updateIndex,
                        toaster.actions.addToast
                      )
                    }}>
                    Delete
                  </button>
                )}
              </Mutation>
              <button className="green" onClick={() => props.close()}>
                Cancel
              </button>
            </FormDiv>
          )}
        </ToasterConsumer>
      )}
    </Mutation>
  )
}

export default MultiDelete
