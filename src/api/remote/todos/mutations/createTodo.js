import gql from 'graphql-tag'
import { getTodos } from '../queries'

const { query } = getTodos

export const mutation = gql`
  mutation($data: TodoCreateInput!) {
    createTodo(data: $data) {
      id
      title
      completed
    }
  }
`

export const variables = props => ({
  data: { title: props.title, completed: false }
})

export const update = (cache, { data: { createTodo } }) => {
  const { todoes } = cache.readQuery({ query })
  cache.writeQuery({ query, data: { todoes: [...todoes, createTodo] } })
}

export const optimisticResponse = props => ({
  createTodo: {
    __typename: 'Todo',
    title: props.title,
    completed: false,
    id: Math.random()
  }
})
