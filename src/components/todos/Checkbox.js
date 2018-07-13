import React from 'react'
import styled from 'styled-components'

const Checkbox = props => {
  return (
    <Input
      onChange={() => props.toggleSelected(props.todo)}
      checked={props.isSelected() ? true : false}
      type="checkbox"
    />
  )
}

export default Checkbox

const Input = styled.input`
  appearance: none;
  width: 20px;
  outline: none;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #ccc;
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  &:checked {
    &:before {
      content: '';
      background: ${props => props.theme.secondaryColor};
      border: 1px solid ${props => props.theme.secondaryColor};
      width: 12px;
      height: 12px;
      position: absolute;
      border-radius: 50%;
    }
  }
`
