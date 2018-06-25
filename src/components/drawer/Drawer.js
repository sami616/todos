import React from 'react'
import { Query } from "react-apollo";
import { GET_DRAWER } from '../../api/client/drawer/queries'

const Drawer = props => {
    return (
        <Query query={GET_DRAWER}>
          {({ data }) => data.drawer.open ? <p>Drawer Open</p> : <p>Drawer Closed</p>}
        </Query>  
    )
}

export default Drawer