import React, { Component, createContext } from 'react'
import { addToast, removeToast } from '../actions'

const Context = createContext()

const ToasterConsumer = props => (
  <Context.Consumer>{d => props.children(d)}</Context.Consumer>
)

class ToasterProvider extends Component {
  constructor(props) {
    super(props)
    this.addToast = addToast.bind(this)
    this.removeToast = removeToast.bind(this)

    this.state = {
      toasts: [],
      actions: {
        addToast: this.addToast,
        removeToast: this.removeToast
      }
    }
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export { ToasterProvider, ToasterConsumer }
