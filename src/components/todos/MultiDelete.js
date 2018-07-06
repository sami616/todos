import React from 'react'
import { Mutation } from 'react-apollo'
import * as deleteManyTodos from '../../api/remote/todos/mutations/deleteManyTodos'
import { ToasterConsumer } from '../toaster/context'
import { Form } from './'

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
        <ToasterConsumer>
          {toaster => (
            <Form>
              <h2>Delete selected todos?</h2>
              <button
                className="blue"
                onClick={() => {
                  handleDelete(deleteManyTodos, toaster.actions.addToast)
                }}>
                Delete
              </button>

              <button className="green" onClick={() => props.close()}>
                Cancel
              </button>
            </Form>
          )}
        </ToasterConsumer>
      )}
    </Mutation>
  )
}

export default MultiDelete
