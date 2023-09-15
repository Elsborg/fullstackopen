import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import storageService from './services/storage'

import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const user = storageService.loadUser()
    setUser(user)
  }, [])

  const login = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })
      setUser(user)
      storageService.saveUser(user)
      dispatch(
        setNotification({
          message: `Wecome! ${user.username}`,
          type: 'info',
        })
      )
    } catch (exception) {
      dispatch(
        setNotification({
          message: 'wrong username or password',
          type: 'error',
        })
      )
    }
  }

  const logout = () => {
    setUser(null)
    storageService.removeUser()
    dispatch(setNotification({ message: 'logged out', type: 'warning' }))
  }

  const createBlog = async (newBlog) => {
    const createdBlog = await blogService.create(newBlog)
    dispatch(
      setNotification({
        message: `Blog ${newBlog.title} by ${newBlog.author} added`,
        type: 'error',
      })
    )
    setBlogs(blogs.concat(createdBlog))
    blogFormRef.current.toggleVisibility()
  }

  const like = async (blog) => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    const updatedBlog = await blogService.update(blogToUpdate)
    dispatch(
      setNotification({
        message: `A like for the blog '${blog.title}' by '${blog.author}'`,
        type: 'info',
      })
    )
    setBlogs(blogs.map((b) => (b.id === blog.id ? updatedBlog : b)))
  }

  const remove = async (blog) => {
    const ok = window.confirm(
      `Sure you want to remove ${blog.title} by ${blog.author}?`
    )
    if (ok) {
      await blogService.remove(blog.id)
      dispatch(
        setNotification({
          message: `The blog ${blog.title} by ${blog.author} removed`,
          type: 'warning',
        })
      )
      setBlogs(blogs.filter((b) => b.id !== blog.id))
    }
  }

  if (!user) {
    return (
      <div>
        <Notification />
        <h2>log in to application</h2>
        <LoginForm login={login} />
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      <div>
        {blogs.sort(byLikes).map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            like={() => like(blog)}
            canRemove={user && blog.user.username === user.username}
            remove={() => remove(blog)}
          />
        ))}
      </div>
    </div>
  )
}

export default App
