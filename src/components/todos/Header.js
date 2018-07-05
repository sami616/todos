import React from 'react'
import { Nav } from './'
import styled from 'styled-components'

const Header = () => {
  return (
    <Wrap>
      <Logo>Logo</Logo>
      <Nav />
    </Wrap>
  )
}

export default Header

const Logo = styled.h1`
  margin: 0 20px 0 0;
`

const Wrap = styled.div`
  margin: 0 0 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
