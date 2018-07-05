import React, { Component, Fragment as F } from 'react'
import { EditModal } from './'
import styled from 'styled-components'
import { Icon } from 'react-icons-kit'
import { ic_mode_edit } from 'react-icons-kit/md/ic_mode_edit'

class PromptEdit extends Component {
  state = {
    modal: false
  }
  render() {
    return (
      <F>
        <Ico
          onClick={() => this.setState({ modal: true })}
          icon={ic_mode_edit}
        />
        <EditModal
          todo={this.props.todo}
          on={this.state.modal}
          close={() => this.setState({ modal: false })}
        />
      </F>
    )
  }
}

export default PromptEdit

const Ico = styled(Icon).attrs({
  size: 20
})`
  margin: 5px;
  cursor: pointer;
  color: ${props => props.theme.primaryColor};
`
