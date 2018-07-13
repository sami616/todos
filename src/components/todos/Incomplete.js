import React, { Component, Fragment as F } from 'react'
import { Query, Mutation } from 'react-apollo'
import { query } from '../../api/remote/todos/queries/getTodos'
import * as updateTodoMutation from '../../api/remote/todos/mutations/updateTodo'
import { ToasterConsumer } from '../toaster/context'
import { arrayMove } from 'react-sortable-hoc'
import { AddTodo } from './'
import { MultiToggle } from './'
import { List } from './'

class Incomplete extends Component {
  state = {
    selected: []
  }

  toggleSelected = todo => {
    if (this.state.selected.filter(obj => obj.id === todo.id).length > 0) {
      this.setState({
        selected: this.state.selected.filter(obj => todo.id !== obj.id)
      })
    } else {
      this.setState({ selected: [...this.state.selected, todo] })
    }
  }

  setSelected = todoArr => {
    this.setState(state => ({
      selected: todoArr
    }))
  }

  clearSelected = () => {
    this.setState(state => ({
      selected: []
    }))
  }

  onSortEnd = async (oldIndex, newIndex, updateTodo, todos, addToast) => {
    const sortedTodos = arrayMove(todos, oldIndex, newIndex)

    const promisesToAwait = []
    sortedTodos.forEach((todo, index) => {
      promisesToAwait.push(
        updateTodo({
          variables: updateTodoMutation.variables({
            id: todo.id,
            properties: {
              position: index
            }
          }),
          optimisticResponse: updateTodoMutation.optimisticResponse({
            ...todo,
            position: index
          })
        })
      )
    })

    try {
      await Promise.all(promisesToAwait)
    } catch (e) {
      addToast({
        type: 'error',
        msg: 'Problem moving todo'
      })
    }
  }

  render() {
    return (
      <F>
        <Query query={query}>
          {res => {
            let incomplete = []
            let completeLength = 0

            if (res.data && res.data.todoes) {
              incomplete = res.data.todoes
                .filter(todo => !todo.completed)
                .sort(function(a, b) {
                  return a.position - b.position
                })

              completeLength = res.data.todoes.filter(todo => todo.completed)
                .length
            }

            return (
              <F>
                <AddTodo count={incomplete.length} />
                {res.loading && <p>Loading</p>}
                {res.error && <p>Error</p>}
                {!incomplete.length && !res.loading && <p>No todos</p>}

                <Mutation mutation={updateTodoMutation.mutation}>
                  {updateTodo => (
                    <ToasterConsumer>
                      {toaster => (
                        <List
                          pressDelay={200}
                          lockAxis="y"
                          helperClass="dragged-item"
                          onSortEnd={({ oldIndex, newIndex }) => {
                            this.onSortEnd(
                              oldIndex,
                              newIndex,
                              updateTodo,
                              incomplete,
                              toaster.actions.addToast
                            )
                          }}
                          oppositeLength={completeLength}
                          selected={this.state.selected}
                          toggleSelected={this.toggleSelected}
                          items={incomplete}
                        />
                      )}
                    </ToasterConsumer>
                  )}
                </Mutation>

                <MultiToggle
                  todos={incomplete}
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
