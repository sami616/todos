import React from 'react'
import { Modal } from '../modal'
import { EditTodo } from './'

const EditModal = props => {
  return (
    <Modal on={props.on} close={props.close}>
      <EditTodo todo={props.todo} close={props.close} />
    </Modal>
  )
}

export default EditModal
