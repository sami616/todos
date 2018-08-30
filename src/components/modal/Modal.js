import React from 'react'
import { Portal } from '../portal'
import styled from 'styled-components'
import { Transition } from 'react-transition-group'

const Modal = props => {
  return (
    <Portal>
      <Transition
        unmountOnExit
        mountOnEnter
        in={props.on}
        timeout={{ enter: 0, exit: 200 }}>
        {status => (
          <Overlay status={status} onClick={props.close}>
            <Box status={status} onClick={e => e.stopPropagation()}>
              {props.children}
            </Box>
          </Overlay>
        )}
      </Transition>
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
  box-shadow: 0 0 8px 0px rgba(78, 78, 78, 0.69);
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s linear;
  opacity: 0;
  ${props =>
    props.status === 'entered' &&
    `
    opacity: 1;
  `};
`

const Box = styled.div`
  background: #fff;
  padding: 20px;
  width: 100%;
  border-radius: 4px;
  max-width: 600px;
  margin: 20px;
  opacity: 0;
  transform: scale3d(0.5, 0.5, 0.5);
  transition: all 400ms cubic-bezier(0.75, -0.5, 0, 1.75);
  ${props =>
    props.status === 'entered' &&
    `
    opacity: 1;
    transform: scale3d(1, 1, 1);
  `};
`
