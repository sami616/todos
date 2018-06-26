import gql from 'graphql-tag'
import { getTodos } from '../queries'

const { query } = getTodos

export const mutation = gql`
  mutation($data: TodoUpdateInput!, $where: TodoWhereUniqueInput!) {
    updateTodo(data: $data, where: $where) {
      id
      title
      completed
    }
  }
`

export const variables = props => ({
  data: { completed: !props.completed },
  where: { id: props.id }
})

export const update = (cache, { data: { updateTodo } }) => {
  const { todoes } = cache.readQuery({ query })
  todoes.forEach(todo => {
    if (todo.id === updateTodo.id) {
      todo.completed = updateTodo.completed
    }
  })
  cache.writeQuery({ query, data: { todoes } })
}

export const optimisticResponse = props => ({
  updateTodo: {
    __typename: 'Todo',
    title: props.title,
    completed: !props.completed,
    id: props.id
  }
})
