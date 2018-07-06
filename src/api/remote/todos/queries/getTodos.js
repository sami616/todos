import gql from 'graphql-tag'

export const query = gql`
  query {
    todoes {
      id
      title
      completed
      position
    }
  }
`
