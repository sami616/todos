import React from 'react'
import { Portal } from '../portal'
import styled from 'styled-components'

const Modal = props => {
  if (!props.on) return null
  return (
    <Portal>
      <Overlay onClick={props.close}>
        <Box onClick={e => e.stopPropagation()}>{props.children}</Box>
      </Overlay>
    </Portal>
  )
}

export default Modal

const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
`

const Box = styled.div`
  background: #fff;
  padding: 20px;
`
