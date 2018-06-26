import gql from 'graphql-tag'
import { getTodos } from '../queries'

const { query } = getTodos

export const mutation = gql`
  mutation($where: TodoWhereUniqueInput!) {
    deleteTodo(where: $where) {
      id
      title
      completed
    }
  }
`

export const variables = props => ({
  where: { id: props.id }
})

export const update = (cache, { data: { deleteTodo } }) => {
  let { todoes } = cache.readQuery({ query })
  todoes = todoes.filter(todo => todo.id !== deleteTodo.id)
  cache.writeQuery({ query, data: { todoes } })
}

export const optimisticResponse = props => ({
  deleteTodo: {
    __typename: 'Todo',
    title: props.title,
    completed: props.completed,
    id: props.id
  }
})
