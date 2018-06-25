import gql from "graphql-tag";

const CREATE_TODO = gql`
  mutation($data: TodoCreateInput!) {
    createTodo(data: $data) {
        id
        title
        completed
      }
  }
`

export default CREATE_TODO