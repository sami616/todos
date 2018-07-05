import React, { Component } from 'react'
import styled from 'styled-components'
import { withBaseIcon } from 'react-icons-kit'
import { ic_error } from 'react-icons-kit/md/ic_error'
import { ic_check_circle } from 'react-icons-kit/md/ic_check_circle'

const Icon = props =>
  withBaseIcon({
    size: 20,
    style: { marginRight: 10, color: props.color }
  })

const ErrIco = props => <Icon color={props.color} icon={ic_error} />
const CheckIco = props => <Icon color={props.color} icon={ic_check_circle} />

export class Toast extends Component {
  static defaultProps = {
    success: {
      color: 'green',
      icon: CheckIco
    },
    error: {
      color: 'red',
      icon: ErrIco
    },
    warning: {
      color: 'yellow',
      icon: ErrIco
    },
    timeoutMS: 3000
  }

  onClick = () => {
    clearTimeout(this.timer)
    this.props.removeToast(this.props.toast.id)
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.props.removeToast(this.props.toast.id)
    }, this.props.timeoutMS)
  }

  render() {
    const { msg, type } = this.props.toast
    const { success, error, warning } = this.props

    let TypeObj = null

    switch (type) {
      case 'success':
        TypeObj = success
        break
      case 'error':
        TypeObj = error
        break
      case 'warning':
        TypeObj = warning
        break
      default:
        break
    }

    return (
      <Container color={TypeObj.color}>
        <div>
          {TypeObj.icon && <TypeObj.icon color={TypeObj.color} />}
          {msg}
        </div>
        <span onClick={this.onClick}>+</span>
      </Container>
    )
  }
}

const Container = styled.div`
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #929292;
  border-radius: 0 4px 4px 0;
  background: #ffffff;
  box-shadow: 0 0 10px rgba(103, 103, 103, 0.4);
  font-family: helvetica;
  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  span {
    font-size: 30px;
    user-select: none;
    cursor: pointer;
    transform: rotate(45deg);
    margin: 0 0 0 30px;
    color: #ccc;
    &:hover {
      color: #666;
    }
  }
  ${props =>
    props.color &&
    `
      border-left:  2px solid ${props.color};
    `};
`
