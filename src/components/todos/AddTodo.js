import React, { Component, Fragment } from 'react'
import { Mutation } from 'react-apollo'

// Todos @remote
import { createTodo } from '../../api/remote/todos/mutations'

class AddTodo extends Component {
  state = {
    title: ''
  }

  onTodoCreate = async createTodo => {
    const title = this.state.title.trim()
    if (title) {
      await createTodo()
      this.setState({ title: '' })
    } else {
      alert('Please type a todo')
    }
  }

  render() {
    return (
      <Mutation
        {...createTodo}
        optimisticResponse={createTodo.optimisticResponse({
          title: this.state.title
        })}
        variables={createTodo.variables({ title: this.state.title })}>
        {(createTodo, status) => (
          <Fragment>
            <input
              type="text"
              value={this.state.title}
              onChange={e => this.setState({ title: e.target.value })}
            />
            <button onClick={() => this.onTodoCreate(createTodo)}>
              Create Todo
            </button>
            {status.error && <p>There was a problem adding your todo</p>}
          </Fragment>
        )}
      </Mutation>
    )
  }
}

export default AddTodo
