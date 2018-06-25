import React, { Fragment as F } from 'react'
import { Query } from 'react-apollo'
import { GET_TODOS_WHERE } from '../../api/remote/todos/queries'
import { AddTodo } from './'
import { Todo } from './'

const Incomplete = props => (
    <F>
        <AddTodo />
        
        <br />
        <br />

        <Query
            query={GET_TODOS_WHERE}
            variables={{
                where: { completed: false }
            }}>
            {res => {
                if (res.loading) return <p>Loading</p>
                if (res.error) return <p>Error</p>
                return res.data.todoes.map(todo => <Todo key={todo.id} todo={todo} />)
            }}
        </Query>
    </F>
)


export default Incomplete