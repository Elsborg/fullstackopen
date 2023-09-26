import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const userSlice = createSlice({
  name: 'user',
  initialState: [],
  reducers: {
    initUser(state, action) {
      return action.payload
    },
  },
})

export const { initUser } = userSlice.actions

export const initializeUsers = () => {
  return async (dispatch) => {
    const user = await userService.getAll()
    dispatch(initUser(user))
  }
}

export default userSlice.reducer
