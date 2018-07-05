import React, { Component, Fragment as F } from 'react'
import { Query } from 'react-apollo'
import { query } from '../../api/remote/todos/queries/getTodos'
import { AddTodo } from './'
import { Todo } from './'
import { MultiToggle } from './'

class Incomplete extends Component {
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
      <F>
        <AddTodo />

        <Query query={query}>
          {res => {
            if (res.loading) return <p>Loading</p>
            if (res.error) return <p>Error</p>
            const incomplete = res.data.todoes.filter(todo => !todo.completed)
            if (!incomplete.length) return <p>No todos</p>
            return (
              <F>
                {incomplete.map(todo => (
                  <Todo
                    selected={this.state.selected}
                    toggleSelected={this.toggleSelected}
                    key={todo.id}
                    todo={todo}
                  />
                ))}
              </F>
            )
          }}
        </Query>

        <MultiToggle
          setSelected={this.setSelected}
          clearSelected={this.clearSelected}
          completed={false}
          selected={this.state.selected}
        />
      </F>
    )
  }
}

export default Incomplete
