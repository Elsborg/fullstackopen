import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
        title: title,
        author: author,
        url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
}

  return (
    <div>
        <h2>Create new blog</h2>
        <form onSubmit={addBlog}>
        <div>
          Title:
          <input
            type='text'
            value={title}
            name='title'
            onChange={handleTitleChange}  
          />
        </div>
        <div>
          Author:
          <input
            type='text'
            value={author}
            name='author'
            onChange={handleAuthorChange}  
          />
        </div>
        <div>
          Url:
          <input
            type='text'
            value={url}
            name='url'
            onChange={handleUrlChange}  
          />
        </div>
        <button type='submit'>Create</button>
        </form>
    </div>
  )
}

export default BlogForm