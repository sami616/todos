import { toggleDrawer } from './client/drawer/mutations'

const resolvers = {
  Query: {},
  Mutation: {
    toggleDrawer: toggleDrawer.resolver
  }
}

export default resolvers
