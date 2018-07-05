import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import * as updateTodo from '../../api/remote/todos/mutations/updateTodo'
import { ToasterConsumer } from '../toaster/context'

class EditTodo extends Component {
  state = {
    editTitle: ''
  }

  componentDidMount() {
    this.setState({
      editTitle: this.props.todo.title
    })
  }

  handleUpdate = async (updateTodo, addToast, e) => {
    e.preventDefault()
    this.props.close()
    try {
      await updateTodo()
    } catch (e) {
      addToast({
        type: 'error',
        msg: 'Whoops, there was a problem updating your todos'
      })
    }
  }

  render() {
    return (
      <Mutation
        mutation={updateTodo.mutation}
        variables={updateTodo.variables({
          id: this.props.todo.id,
          properties: { title: this.state.editTitle }
        })}
        optimisticResponse={updateTodo.optimisticResponse({
          title: this.state.editTitle,
          id: this.props.todo.id,
          completed: this.props.todo.completed
        })}>
        {updateTodo => (
          <ToasterConsumer>
            {toaster => (
              <form
                onSubmit={e => {
                  this.handleUpdate(updateTodo, toaster.actions.addToast, e)
                }}>
                <input
                  type="text"
                  onChange={e => this.setState({ editTitle: e.target.value })}
                  value={this.state.editTitle}
                />
                <button>Update</button>
              </form>
            )}
          </ToasterConsumer>
        )}
      </Mutation>
    )
  }
}

export default EditTodo
