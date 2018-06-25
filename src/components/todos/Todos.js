import React, { Component, Fragment as F } from 'react'
import { Complete } from './'
import { Incomplete } from './'
import { Route, Switch, Link } from 'react-router-dom'


const Todos = props => {
    return (
        <F>
        
        <Link to="/complete">Complete</Link>
        <Link to="/incomplete">Incomplete</Link>
        
        <br/>
        <br/>

        <Switch>
            <Route path="/incomplete" component={Incomplete}/>
            <Route path="/complete" component={Complete}/>
            <Route render={()=><p>404</p>}/>
        </Switch>
        </F>
    )
}

export default Todos