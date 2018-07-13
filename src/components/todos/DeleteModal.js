import React from 'react'
import { Modal } from '../modal'
import { MultiDelete } from './'

const DeleteModal = props => {
  return (
    <Modal on={props.on} close={props.close}>
      <MultiDelete
        todos={props.todos}
        setSelected={props.setSelected}
        clearSelected={props.clearSelected}
        selected={props.selected}
        close={props.close}
      />
    </Modal>
  )
}

export default DeleteModal
