import React, { useState } from 'react'

const Blog = ({ blog, addLike, removeBlog }) => {
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const buttonLabel = visible ? 'Hide' : 'View'

  const blogStyling = {
    marginTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 10
  }

  return (
    <div style={blogStyling}>
      <div>
        <p>{blog.title} - {blog.author} <button onClick={toggleVisibility}>{buttonLabel}</button></p>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>{blog.likes} <button onClick={addLike}>Like</button></p>
        <p>{blog.user.name}</p>
        <button style={{ marginBottom: 5, }}
          onClick={removeBlog}>Remove</button>
      </div>
    </div>
  )
}

export default Blog