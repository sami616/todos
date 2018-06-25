import gql from 'graphql-tag'

const GET_INCOMPLETE_TODOS = gql`
    query {
        todoes(where: { completed: false }) {
            id
            title
            completed
        }
    }
`

export default GET_INCOMPLETE_TODOS 