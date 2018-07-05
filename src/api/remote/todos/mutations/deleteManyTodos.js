import gql from 'graphql-tag'
import { query as getTodos } from '../queries/getTodos'

export const mutation = gql`
  mutation($where: TodoWhereInput!) {
    deleteManyTodoes(where: $where) {
      count
    }
  }
`

export const variables = props => ({
  where: { id_in: props.ids }
})

export const update = (
  cache,
  { data: { deleteManyTodoes } },
  variables = null
) => {
  let { todoes } = cache.readQuery({ query: getTodos })
  todoes = todoes.filter(todo => !variables.includes(todo.id))
  cache.writeQuery({ query: getTodos, data: { todoes } })
}

export const optimisticResponse = props => ({
  deleteManyTodoes: {
    __typename: 'BatchPayload',
    count: props.count
  }
})
