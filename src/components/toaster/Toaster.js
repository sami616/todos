import React from 'react'
import { Toast } from './components'
import styled from 'styled-components'
import posed, { PoseGroup } from 'react-pose'
import { ToasterConsumer } from './context'

const Toaster = props => {
  const { success, error, warning } = props
  return (
    <ToasterConsumer>
      {toaster => (
        <Wrap length={toaster.toasts.length}>
          <PoseGroup preEnterPose="preEnter">
            {toaster.toasts.map(t => (
              <PosedItem key={t.id}>
                <Toast
                  success={success}
                  error={error}
                  warning={warning}
                  removeToast={toaster.actions.removeToast}
                  toast={t}
                />
              </PosedItem>
            ))}
          </PoseGroup>
        </Wrap>
      )}
    </ToasterConsumer>
  )
}

export { Toaster }

const PosedItem = styled(
  posed.div({
    preEnter: { opacity: 0, x: 40 },
    enter: { opacity: 1, x: 0 },
    exit: {
      opacity: 0,
      x: 20
    }
  })
)`
  padding: 0 0 5px 0;
  &:last-child {
    padding: 0;
  }
`

const Wrap = styled.div`
  padding: ${props => (props.length ? '20px' : '0')};
  position: fixed;
  z-index: 100;
  top: 0px;
  right: 0;
  width: 100%;
  max-width: 400px;
`
