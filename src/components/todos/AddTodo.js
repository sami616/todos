import React, { Component, Fragment } from 'react'
import { Mutation } from "react-apollo";

// Todos @remote
import { CREATE_TODO } from '../../api/remote/todos/mutations'
import { addTodo } from '../../api/remote/todos/update'

class AddTodo extends Component {
    
    state = {
        title: ''
    }

    onTodoCreate = async createTodo => {
        const title = this.state.title.trim()
        if(title){ 
          await createTodo()
          this.setState({ title: '' })
        } else { alert('Please type a todo') }
      }
      
    render(){
        return (
            <Mutation
            mutation={CREATE_TODO}
            optimisticResponse={{
                createTodo: {
                    __typename: 'Todo',
                    title: this.state.title,
                    completed: false,
                    id: Math.random()
                }
            }}
            variables={{ data: { title: this.state.title, completed: false } }}
            update={addTodo}>
                {(createTodo, status) => (               
                    <Fragment>
                        <input type="text" value={this.state.title} onChange={e => this.setState({ title: e.target.value })} />
                        <button onClick={()=>this.onTodoCreate(createTodo)}>Create Todo</button>
                        {status.error && <p>There was a problem adding your todo</p>}
                    </Fragment>
                )}
          </Mutation>
        )
    }
}

export default AddTodo