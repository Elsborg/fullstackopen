import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      return state.concat(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    removeBlog(state, action) {
      const blogToRemove = action.payload
      return state.filter((blog) => blog.id !== blogToRemove)
    },
    replaceBlog(state, action) {
      const replaced = action.payload
      return state.map((s) => (s.id === replaced.id ? replaced : s))
    },
    makeComment(state, action) {
      return state.map((item) =>
        item.id !== action.payload.id ? item : action.payload
      )
    },
  },
})

export const { appendBlog, setBlogs, removeBlog, replaceBlog, makeComment } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content, user) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(content)
      newBlog.user = user
      dispatch(appendBlog(newBlog))
    } catch (error) {
      dispatch(
        setNotification({
          message: 'Could not add blog',
          type: 'danger',
        })
      )
    }
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id)
      dispatch(removeBlog(id))
    } catch (error) {
      dispatch(
        setNotification({ message: 'something went wrong...', type: 'danger' })
      )
    }
  }
}

export const likeBlog = (object) => {
  const toLike = {
    ...object,
    likes: object.likes + 1,
  }
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update(toLike)
      updatedBlog.user = object.user
      dispatch(replaceBlog(updatedBlog))
    } catch (error) {
      setNotification({ message: 'something went wrong...', type: 'danger' })
    }
  }
}

export const commentBlog = (id, comment) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.comment(id, comment)
      dispatch(makeComment(updatedBlog))
    } catch (error) {
      setNotification({ message: 'something went wrong', type: 'danger' })
    }
  }
}

export default blogSlice.reducer
