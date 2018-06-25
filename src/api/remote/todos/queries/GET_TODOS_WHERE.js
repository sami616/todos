import gql from 'graphql-tag'

const GET_TODOS_WHERE = gql`
    query($where: TodoWhereInput) {
        todoes(where: $where) {
            id
            title
            completed
        }
    }
`

export default GET_TODOS_WHERE