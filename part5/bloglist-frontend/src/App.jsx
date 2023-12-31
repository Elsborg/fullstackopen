import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setSuccessMessage(null)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    window.location.reload()
  }

  const createBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const createdBlog = await blogService.create(newBlog)
      createdBlog.user = user
      setSuccessMessage(`Blog ${newBlog.title} by ${newBlog.author} added`)
      setBlogs(blogs.concat(createdBlog))
      setErrorMessage(null)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch(exception) {
      setErrorMessage(`Cannot add blog ${newBlog.title}`)
      setSuccessMessage(null)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button id='login' onClick={() => setLoginVisible(true)}>Log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>Cancel</button>
        </div>
      </div>
    )
  }

  const addLike = async id => {
    const blogToUpdate = blogs.find(blogs => blogs.id === id)
    const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }
    await blogService.update(id, updatedBlog)
    setBlogs(blogs.map(blog => blog.id === id ? updatedBlog : blog))
  }

  const removeBlog = async id => {
    const blogToDelete = blogs.find(blogs => blogs.id === id)
    if (window.confirm(`Remove blog ${blogToDelete.title} by ${blogToDelete.author}?`)) {
      await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
    }
  }

  const sortBlogs = () => {
    blogs.sort((a, b) => (b.likes - a.likes))

    return (
      blogs.map(blog => (
        <Blog key={blog.id} blog={blog} addLike={() => addLike(blog.id)} removeBlog={() => removeBlog(blog.id)} currentUsername={user} />
      ))
    )
  }


  return (
    <div>
      <Notification errorMessage={errorMessage} successMessage={successMessage} />
      {!user && <div> <h2>Log in to application</h2>
        {loginForm()} </div>}
      {user && <div>
        <h2>blogs</h2>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>Logout</button>
        <Togglable buttonLabel="New blog" ref={blogFormRef}>
          <BlogForm
            createBlog={createBlog}
          />
        </Togglable>
        {sortBlogs()}
      </div>}
    </div>

  )
}

export default App