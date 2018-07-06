import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import * as updateTodo from '../../api/remote/todos/mutations/updateTodo'
import { ToasterConsumer } from '../toaster/context'
import { Form } from './'

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
          ...this.props.todo,
          title: this.state.editTitle
        })}>
        {updateTodo => (
          <ToasterConsumer>
            {toaster => (
              <Form
                onSubmit={e => {
                  this.handleUpdate(updateTodo, toaster.actions.addToast, e)
                }}>
                <h2>Edit todo</h2>
                <input
                  type="text"
                  onChange={e => this.setState({ editTitle: e.target.value })}
                  value={this.state.editTitle}
                />
                <button className="inputButton">Update</button>
              </Form>
            )}
          </ToasterConsumer>
        )}
      </Mutation>
    )
  }
}

export default EditTodo
