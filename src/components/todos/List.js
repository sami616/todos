import React from 'react'
import { Todo } from './'
import { SortableContainer } from 'react-sortable-hoc'
import posed, { PoseGroup } from 'react-pose'
import styled from 'styled-components'

const List = props => {
  return (
    <ListBG>
      <PoseGroup>
        {props.items.map((todo, index) => (
          <PosedItem key={todo.id}>
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
          </PosedItem>
        ))}
      </PoseGroup>
    </ListBG>
  )
}

export default SortableContainer(List)

const ListBG = styled.div`
  background: #f3f3f3;
`

const PosedItem = styled(
  posed
    .div
    //   {
    //   preEnter: { opacity: 0, x: 40 },
    //   enter: { opacity: 1, x: 0 },
    //   exit: {
    //     opacity: 0,
    //     x: 20
    //   }
    // }
    ()
)``
