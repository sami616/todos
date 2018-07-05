import gql from 'graphql-tag'

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
  data: { ...props.properties },
  where: { id: props.id }
})

export const optimisticResponse = props => ({
  updateTodo: {
    __typename: 'Todo',
    ...props
  }
})
