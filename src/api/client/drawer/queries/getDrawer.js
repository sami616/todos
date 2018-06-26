import gql from 'graphql-tag'

export const defaults = {
  __typename: 'DRAWER',
  open: false
}

export const query = gql`
  query {
    drawer @client {
      open
    }
  }
`
