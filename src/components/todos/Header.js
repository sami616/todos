import React from 'react'
import { Nav } from './'
import styled from 'styled-components'

const Header = () => {
  return (
    <Wrap>
      <Nav />
    </Wrap>
  )
}

export default Header

const Wrap = styled.div`
  margin: 0 0 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`
