import React from 'react'
import { Todo } from './'
import { SortableContainer } from 'react-sortable-hoc'
import styled from 'styled-components'

const List = props => {
  return (
    <ListBG>
      {props.items.map((todo, index) => (
        <Todo
          disabled={todo.id.indexOf('temp_id') === -1 ? false : true}
          oppositeLength={props.oppositeLength}
          selected={props.selected}
          toggleSelected={props.toggleSelected}
          key={todo.id}
          index={index}
          todo={todo}
          todos={props.items}
        />
      ))}
    </ListBG>
  )
}

export default SortableContainer(List)

const ListBG = styled.div`
  background: #f3f3f3;
`
