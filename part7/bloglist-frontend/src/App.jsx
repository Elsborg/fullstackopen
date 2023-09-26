import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import storageService from './services/storage'

import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Navbar from './components/Navbar'
import User from './components/User'
import Blogs from './components/Blogs'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/loginReducer'
import Users from './components/Users'
import { initializeUsers } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      dispatch(initializeBlogs(blogs))
    })
  }, [dispatch])

  useEffect(() => {
    const user = storageService.loadUser()
    dispatch(setUser(user))
    dispatch(initializeUsers())
  }, [dispatch])

  if (!user) {
    return (
      <div>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <Router>
      <div>
        <Navbar />
        <Notification />
      </div>
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="users/:id" element={<User />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="blogs/:id" element={<Blog />} />
        <Route
          path="/"
          element={
            <div>
              <BlogForm />
              <Blogs />
            </div>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
