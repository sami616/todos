import React, { Component, Fragment as F } from 'react'
import { Query, Mutation } from 'react-apollo'
import { query as getTodos } from '../../api/remote/todos/queries/getTodos'
import { List } from './'
import { MultiToggle } from './'
import { PromptDelete } from './'
import * as updateTodoMutation from '../../api/remote/todos/mutations/updateTodo'
import { ToasterConsumer } from '../toaster/context'
import { arrayMove } from 'react-sortable-hoc'

class Complete extends Component {
  state = {
    selected: [],
    all: false
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
    const sortedTodos = arrayMove(todos, oldIndex, newIndex).reverse()

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
      <Query query={getTodos}>
        {res => {
          if (res.loading) return <p>Loading</p>
          if (res.error) return <p>Error</p>
          const complete = res.data.todoes
            .filter(todo => todo.completed)
            .sort(function(a, b) {
              return b.position - a.position
            })

          const incompleteLength = res.data.todoes.filter(
            todo => !todo.completed
          ).length
          if (!complete.length && !res.loading) return <p>No todos</p>
          return (
            <F>
              <Mutation mutation={updateTodoMutation.mutation}>
                {updateTodo => (
                  <ToasterConsumer>
                    {toaster => (
                      <List
                        pressDelay={200}
                        lockAxis="y"
                        onSortEnd={({ oldIndex, newIndex }) => {
                          this.onSortEnd(
                            oldIndex,
                            newIndex,
                            updateTodo,
                            complete,
                            toaster.actions.addToast
                          )
                        }}
                        oppositeLength={incompleteLength}
                        selected={this.state.selected}
                        toggleSelected={this.toggleSelected}
                        items={complete}
                      />
                    )}
                  </ToasterConsumer>
                )}
              </Mutation>

              <div>
                <PromptDelete
                  todos={complete}
                  setSelected={this.setSelected}
                  clearSelected={this.clearSelected}
                  selected={this.state.selected}
                />
                <MultiToggle
                  todos={complete}
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
