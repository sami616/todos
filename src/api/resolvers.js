import { resolver as toggleModal } from './client/modal/mutations/toggleModal'
import { resolver as toggleSelected } from './client/selected-todo/mutations/toggleSelected'
import { resolver as clearSelected } from './client/selected-todo/mutations/clearSelected'

const resolvers = {
  Query: {},
  Mutation: {
    toggleModal,
    toggleSelected,
    clearSelected
  }
}

export default resolvers
