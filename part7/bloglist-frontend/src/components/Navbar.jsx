import React from 'react'
import styled from 'styled-components'
import { Link, NavLink } from 'react-router-dom'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../reducers/loginReducer'

import storageService from '../services/storage'

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Roboto', sans-serif;
  background: linear-gradient(to right, #6a1b9a, #9c27b0);
  color: #fff; /* White text color */
  padding: 10px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const NavButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`

const NavButton = styled(NavLink)`
  text-decoration: none;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    color: lightgrey;
  }

  &.active {
    background-color: #7b1fa2;
  }

  &:first-child {
    margin-left: 10px;
  }
`

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 20px;
`

const UserName = styled.span`
  margin-right: 10px;
  font-weight: bold;
`

const LogoutButton = styled.button`
  background-color: 
  color: #6a1b9a;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: bold;
  transition:
    background-color 0.3s ease-in-out,
    color 0.3s ease-in-out;

  &:hover {
    background-color: #f0f0f0; 
  }
`

const Navbar = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const logout = () => {
    dispatch(setUser(null))
    storageService.removeUser()
    dispatch(setNotification({ message: 'logged out', type: 'warning' }))
  }

  return (
    <NavbarContainer>
      <NavButtons>
        <NavButton to="/">Home</NavButton>
        <NavButton to="/blogs">Blogs</NavButton>
        <NavButton to="/users">Users</NavButton>
      </NavButtons>
      {user && (
        <UserInfo>
          <UserName>{user.name} logged in</UserName>
          <LogoutButton onClick={logout}>Logout</LogoutButton>
        </UserInfo>
      )}
    </NavbarContainer>
  )
}

export default Navbar
