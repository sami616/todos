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
        <Query query={query}>
          {res => {
            let incomplete = []
            let completeLength = 0
            if (res.data.todoes) {
              incomplete = res.data.todoes.filter(todo => !todo.completed)
              completeLength = res.data.todoes.filter(todo => todo.completed)
                .length
            }

            return (
              <F>
                <AddTodo count={incomplete.length} />
                {res.loading && <p>Loading</p>}
                {res.error && <p>Error</p>}
                {!incomplete.length && <p>No todos</p>}
                {incomplete.map(todo => (
                  <Todo
                    oppositeLength={completeLength}
                    selected={this.state.selected}
                    toggleSelected={this.toggleSelected}
                    key={todo.id}
                    todo={todo}
                  />
                ))}

                <MultiToggle
                  oppositeLength={completeLength}
                  setSelected={this.setSelected}
                  clearSelected={this.clearSelected}
                  completed={false}
                  selected={this.state.selected}
                />
              </F>
            )
          }}
        </Query>
      </F>
    )
  }
}

export default Incomplete
