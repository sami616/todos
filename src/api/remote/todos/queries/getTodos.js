import gql from 'graphql-tag'

export const query = gql`
  query {
    todoes(orderBy: position_DESC) {
      id
      title
      completed
      position
    }
  }
`
