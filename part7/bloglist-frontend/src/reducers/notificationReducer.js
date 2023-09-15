import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: null,
  type: null,
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.message = action.payload.message
      state.type = action.payload.type
    },
    hideNotification: (state) => {
      state.message = null
      state.type = null
    },
  },
})

export const { setNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer
