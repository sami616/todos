import React, { Component, Fragment as F } from 'react'
import styled from 'styled-components'
import { DeleteModal } from './'

class PromptDelete extends Component {
  state = {
    modal: false
  }

  render() {
    return (
      <F>
        {this.props.selected.length !== 0 && (
          <DeleteBtn onClick={() => this.setState({ modal: true })}>
            Delete
          </DeleteBtn>
        )}

        <DeleteModal
          todos={this.props.todos}
          setSelected={this.props.setSelected}
          clearSelected={this.props.clearSelected}
          selected={this.props.selected}
          on={this.state.modal}
          close={() => this.setState({ modal: false })}
        />
      </F>
    )
  }
}

export default PromptDelete

const DeleteBtn = styled.button`
  background: #fff;
  float: right;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 4px;
  font-size: 16px;
  margin: 20px 0 0 5px;
  border: 1px solid red;
  outline: none;
  color: red;
  &:hover {
    background: red;
    color: #fff;
  }
`
