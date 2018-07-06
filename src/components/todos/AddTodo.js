import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import * as createTodo from '../../api/remote/todos/mutations/createTodo'
import { ToasterConsumer } from '../toaster/context'
import styled from 'styled-components'
import { ic_add } from 'react-icons-kit/md/ic_add'
import Icon from 'react-icons-kit'

class AddTodo extends Component {
  state = {
    title: ''
  }

  onTodoCreate = async (createTodo, e, addToast) => {
    e.preventDefault()
    const title = this.state.title.trim()
    this.setState({ title: '' })
    if (title) {
      try {
        await createTodo()
      } catch (err) {
        addToast({
          type: 'error',
          msg: 'Whoops, something went wrong'
        })
      }
    } else {
      addToast({
        type: 'error',
        msg: 'Please type a todo'
      })
    }
  }

  render() {
    return (
      <Mutation
        {...createTodo}
        optimisticResponse={createTodo.optimisticResponse({
          properties: {
            title: this.state.title,
            completed: false,
            id: `temp_id_${Math.random()}`,
            position: this.props.count + 1
          }
        })}
        variables={createTodo.variables({
          properties: {
            title: this.state.title,
            completed: false,
            position: this.props.count + 1
          }
        })}>
        {(createTodo, status) => (
          <ToasterConsumer>
            {toaster => (
              <Form
                onSubmit={e =>
                  this.onTodoCreate(createTodo, e, toaster.actions.addToast)
                }>
                <input
                  placeholder="Add a todo"
                  type="text"
                  value={this.state.title}
                  onChange={e => this.setState({ title: e.target.value })}
                />
                <button>
                  <Icon size={25} icon={ic_add} />
                </button>
              </Form>
            )}
          </ToasterConsumer>
        )}
      </Mutation>
    )
  }
}

export default AddTodo

const Form = styled.form`
  display: flex;
  input {
    width: 100%;
    padding: 15px;
    font-size: 16px;
    outline: none;
    color: #848282;
    border-radius: 4px 0 0 4px;
    border: 1px solid #e4e4e4;
    border-right: none;
    font-weight: 300;
  }

  button {
    padding: 0;
    width: 80px;
    cursor: pointer;
    outline: none;
    border: none;
    background: ${props => props.theme.secondaryColor};
    color: #fff;
    font-size: 16px;
    border-radius: 0 4px 4px 0;
  }
`
