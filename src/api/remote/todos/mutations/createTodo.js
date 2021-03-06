import gql from 'graphql-tag'
import { query } from '../queries/getTodos'

export const mutation = gql`
  mutation($data: TodoCreateInput!) {
    createTodo(data: $data) {
      id
      title
      completed
      position
    }
  }
`

export const variables = props => ({
  data: { ...props.properties }
})

export const update = (cache, { data: { createTodo } }) => {
  const { todoes } = cache.readQuery({ query })
  cache.writeQuery({ query, data: { todoes: [createTodo, ...todoes] } })
}

export const optimisticResponse = props => ({
  createTodo: {
    __typename: 'Todo',
    ...props.properties
  }
})
