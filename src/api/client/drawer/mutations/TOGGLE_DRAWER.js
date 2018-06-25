import gql from "graphql-tag";

const TOGGLE_DRAWER = gql`
  mutation {
    toggleDrawer @client {
      open
    }
  }
`

export default TOGGLE_DRAWER