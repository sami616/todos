import gql from 'graphql-tag'

const GET_TODOS = gql`
    query {
        todoes {
            id
            title
            completed
        }
    }
`

export default GET_TODOS