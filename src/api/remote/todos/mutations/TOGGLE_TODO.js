import gql from "graphql-tag";

const TOGGLE_TODO = gql`
  mutation($data: TodoUpdateInput!, $where: TodoWhereUniqueInput!) {
    updateTodo(data: $data, where: $where) {
        id
        title
        completed
      }
  }
`

export default TOGGLE_TODO