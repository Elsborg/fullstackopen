import { createSlice } from '@reduxjs/toolkit'

import loginService from '../services/login'
import storageService from '../services/storage'

import { setNotification } from './notificationReducer'

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const { setUser } = loginSlice.actions

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password })
      dispatch(setUser(user))
      storageService.saveUser(user)
      dispatch(
        setNotification({
          message: `Welcome! ${user.username}`,
          type: 'success',
        })
      )
    } catch {
      dispatch(
        setNotification({
          message: 'Wrong username or password!',
          type: 'danger',
        })
      )
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    storageService.removeUser()
    dispatch(setUser(null))
    dispatch(setNotification({ message: 'logged out', type: 'warning' }))
  }
}

export default loginSlice.reducer
