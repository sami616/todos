import gql from 'graphql-tag'
import { getDrawer } from '../queries'

const { query } = getDrawer

export const mutation = gql`
  mutation {
    toggleDrawer @client {
      open
    }
  }
`

export const resolver = (_, __, { cache }) => {
  const read = cache.readQuery({ query })
  const data = { drawer: { ...read.drawer, open: !read.drawer.open } }
  cache.writeQuery({ query, data })
  return { ...data.drawer }
}
