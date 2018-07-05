import gql from 'graphql-tag'
import { query } from '../queries/getTodos'

export const mutation = gql`
  mutation($data: TodoUpdateInput!, $where: TodoWhereInput) {
    updateManyTodoes(data: $data, where: $where) {
      count
    }
  }
`

export const variables = props => ({
  data: { ...props.properties },
  where: { id_in: props.selected }
})

export const update = (cache, { data: { updateManyTodoes } }, variables) => {
  let { todoes } = cache.readQuery({ query })
  const { ids, properties } = variables

  todoes = todoes.map(todo => {
    if (ids.includes(todo.id)) {
      return (todo = { ...todo, ...properties })
    } else {
      return todo
    }
  })

  cache.writeQuery({ query, data: { todoes } })
}

export const optimisticResponse = props => ({
  updateManyTodoes: {
    __typename: 'BatchPayload',
    count: props.count
  }
})
