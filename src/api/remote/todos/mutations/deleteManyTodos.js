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
  where: { id_in: props.selected.map(todo => todo.id) }
})

export const update = (
  cache,
  { data: { deleteManyTodoes } },
  variables = null
) => {
  let { todoes } = cache.readQuery({ query: getTodos })
  const selectedIDs = variables.selected.map(sel => sel.id)
  todoes = todoes.filter(todo => !selectedIDs.includes(todo.id))
  cache.writeQuery({ query: getTodos, data: { todoes } })
}

export const optimisticResponse = props => ({
  deleteManyTodoes: {
    __typename: 'BatchPayload',
    count: props.count
  }
})
