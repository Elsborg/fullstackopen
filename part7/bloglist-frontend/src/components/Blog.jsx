import React, { useState } from 'react'

const Blog = ({ blog, like, canRemove, remove }) => {
  const [visible, setVisible] = useState(false)

  const blogStyling = {
    marginTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 10,
  }

  return (
    <div style={blogStyling} className="blog">
      {blog.title} {blog.author}
      <button onClick={() => setVisible(!visible)}>
        {visible ? 'hide' : 'show'}
      </button>
      {visible && (
        <div>
          <div>
            {' '}
            <a href={blog.url}> {blog.url}</a>{' '}
          </div>
          <div>
            {' '}
            likes {blog.likes} <button onClick={like}>like</button>{' '}
          </div>
          <div>{blog.user && blog.user.name} </div>
          {canRemove && <button onClick={remove}>delete</button>}
        </div>
      )}
    </div>
  )
}

export default Blog
