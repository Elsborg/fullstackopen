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
            id='title'
            type='text'
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          Author:
          <input
            id='author'
            type='text'
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          Url:
          <input
            id='url'
            type='text'
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <button id='createBlogButton' type='submit'>Create</button>
      </form>
    </div>
  )
}

export default BlogForm