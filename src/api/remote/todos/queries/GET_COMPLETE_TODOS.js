import gql from 'graphql-tag'

const GET_COMPLETE_TODOS = gql`
    query {
        todoes(where: { completed: true }) {
            id
            title
            completed
        }
    }
`

export default GET_COMPLETE_TODOS