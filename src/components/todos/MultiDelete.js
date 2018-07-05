import React, { Fragment as F } from 'react'
import { Mutation } from 'react-apollo'
import * as deleteManyTodos from '../../api/remote/todos/mutations/deleteManyTodos'
import { ToasterConsumer } from '../toaster/context'

const MultiDelete = props => {
  const handleDelete = async (deleteManyTodos, addToast) => {
    const selected = [...props.selected]
    props.clearSelected()
    props.close()
    try {
      await deleteManyTodos()
    } catch (e) {
      props.setSelected(selected)
      addToast({
        type: 'error',
        msg: 'Whoops, there was a problem deleting your todos'
      })
    }
  }

  return (
    <Mutation
      mutation={deleteManyTodos.mutation}
      update={(cache, data) =>
        deleteManyTodos.update(cache, data, props.selected)
      }
      variables={deleteManyTodos.variables({ ids: props.selected })}
      optimisticResponse={deleteManyTodos.optimisticResponse({
        count: props.selected.length
      })}>
      {deleteManyTodos => (
        <F>
          <p>Are you sure you want to delete</p>

          <ToasterConsumer>
            {toaster => (
              <button
                onClick={() => {
                  handleDelete(deleteManyTodos, toaster.actions.addToast)
                }}>
                Delete
              </button>
            )}
          </ToasterConsumer>
        </F>
      )}
    </Mutation>
  )
}

export default MultiDelete
