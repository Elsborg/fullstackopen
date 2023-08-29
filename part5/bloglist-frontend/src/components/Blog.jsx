import React, { useState } from 'react'

const Blog = ({ blog, addLike, removeBlog, currentUsername }) => {
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }
  const blogAuthor = blog.user.username ? blog.user.username : null

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const buttonLabel = visible ? 'Hide' : 'View'
  const showIfAuthor = { display: currentUsername.username === blogAuthor ? '' : 'none' }

  const blogStyling = {
    marginTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 10
  }

  return (
    <div className='blog' style={blogStyling}>
      <div className='content' style={{ display: 'flex', alignItems: 'center' }}>
        {blog.title} {blog.author}
      </div>
      <button id='toggleInfo' className='toggleButton' onClick={toggleVisibility} style={{ marginLeft: 5 }}>{buttonLabel}</button>
      <div className='list' style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>{blog.likes} <button id='likeButton' onClick={addLike}>Like</button></p>
        <p>{blog.user.name}</p>
        <button id='removeButton' style={showIfAuthor}
          onClick={removeBlog}>Remove</button>
      </div>
    </div>
  )
}

export default Blog