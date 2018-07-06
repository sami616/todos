import React, { Component, Fragment as F } from 'react'
import { Query } from 'react-apollo'
import { query as getTodos } from '../../api/remote/todos/queries/getTodos'
import { Todo } from './'
import { MultiToggle } from './'
import { PromptDelete } from './'

class Complete extends Component {
  state = {
    selected: []
  }

  toggleSelected = id => {
    this.setState(state => ({
      selected: state.selected.includes(id)
        ? state.selected.filter(arrID => id !== arrID)
        : [...state.selected, id]
    }))
  }

  setSelected = idArr => {
    this.setState(state => ({
      selected: idArr
    }))
  }
  clearSelected = () => {
    this.setState(state => ({
      selected: []
    }))
  }

  render() {
    return (
      <Query query={getTodos}>
        {res => {
          if (res.loading) return <p>Loading</p>
          if (res.error) return <p>Error</p>
          const complete = res.data.todoes.filter(todo => todo.completed)
          const incompleteLength = res.data.todoes.filter(
            todo => !todo.completed
          ).length
          if (!complete.length) return <p>No todos</p>
          return (
            <F>
              {complete.map(todo => (
                <Todo
                  oppositeLength={incompleteLength}
                  selected={this.state.selected}
                  toggleSelected={this.toggleSelected}
                  key={todo.id}
                  todo={todo}
                />
              ))}
              <div>
                <PromptDelete
                  setSelected={this.setSelected}
                  clearSelected={this.clearSelected}
                  selected={this.state.selected}
                />
                <MultiToggle
                  oppositeLength={incompleteLength}
                  setSelected={this.setSelected}
                  clearSelected={this.clearSelected}
                  completed={true}
                  selected={this.state.selected}
                />
              </div>
            </F>
          )
        }}
      </Query>
    )
  }
}

export default Complete
