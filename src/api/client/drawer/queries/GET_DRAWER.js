import gql from 'graphql-tag'

const GET_DRAWER = gql`
    query {
        drawer @client {
            open
        }
    }
`

export default GET_DRAWER