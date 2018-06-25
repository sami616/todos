import React from 'react'
import { Query } from 'react-apollo'
import { GET_TODOS_WHERE } from '../../api/remote/todos/queries'
import { Todo } from './'

const Complete = props => (
        <Query
            query={GET_TODOS_WHERE}
            variables={{
                where: { completed: true }
            }}>
            {res => {
                if(res.loading) return <p>Loading</p>
                if(res.error) return <p>Error</p>
                if(!res.data.todoes.length) return <p>No complete todos</p>
                return res.data.todoes.map(todo => <Todo key={todo.id} todo={todo}/>)
            }}
        </Query>
)

export default Complete