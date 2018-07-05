import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Nav = () => {
  return (
    <NavWrap>
      <NavLink to="/incomplete">Incomplete</NavLink>
      <NavLink to="/complete">Complete</NavLink>
    </NavWrap>
  )
}

export default Nav

const NavWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  a {
    background: #fff;
    color: ${props => props.theme.primaryColor};
    &.active {
      background: ${props => props.theme.primaryColor};
      color: #fff;
    }
    &:first-child {
      border-radius: 4px 0 0 4px;
      border: 1px solid ${props => props.theme.primaryColor};
      border-right: none;
    }

    &:last-child {
      border-radius: 0 4px 4px 0;
      border: 1px solid ${props => props.theme.primaryColor};
      border-left: none;
    }

    font-weight: 300;
    display: flex;
    padding: 10px 15px;
    justify-content: center;
    align-items: center;
    text-decoration: none;
  }
`
