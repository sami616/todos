import React from 'react'
import { Mutation } from "react-apollo";
import { TOGGLE_DRAWER } from '../../api/client/drawer/mutations'

const Drawer = props => {
    return (
        <Mutation mutation={TOGGLE_DRAWER}>
          {toggleDrawer => <button onClick={toggleDrawer}>Toggle Drawer</button>}
        </Mutation>

    )
}

export default Drawer