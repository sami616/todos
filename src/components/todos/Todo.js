import React, { Fragment as F} from 'react'
import { Mutation } from 'react-apollo'
import { TOGGLE_TODO } from '../../api/remote/todos/mutations'
import { toggleTodo } from '../../api/remote/todos/update'

const Todo = ({ todo }) => {
    return (
        <p>
            {todo.title}
            <Mutation
            update={toggleTodo}
            mutation={TOGGLE_TODO}
            variables={{ 
                data: { completed: !todo.complete },
                where: { id: todo.id  }
            }}>
            {(updateTodo, status) => (               
                    <F>
                        <button onClick={updateTodo}>Toggle</button>
                        {status.error && <p>There was a problem adding your todo</p>}
                    </F>
                )}
            </Mutation>
        </p>
    )
}

export default Todo