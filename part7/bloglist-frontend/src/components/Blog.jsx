import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { likeBlog, deleteBlog, commentBlog } from '../reducers/blogReducer'
import styled from 'styled-components'
import { useMatch, useNavigate } from 'react-router-dom'
import LoadingSpinner from './LoadingSpinner'

const BlogUrl = styled.a`
  font-size: 1rem;
  text-decoration: none;
  color: #007bff;

  &:hover {
    text-decoration: underline;
  }
`

const BlogLikes = styled.p`
  font-size: 1rem;
  margin: 8px 0;
`

const BlogButton = styled.button`
  font-size: 1rem;
  font-weight: bold;
  padding: 8px 16px;
  margin-right: 8px;
  background-color: #885df1;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #662eed;
  }
`

const BlogRemoveButton = styled.button`
  font-size: 1rem;
  padding: 8px 16px;
  background-color: #ff5c5c;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #d62c2c;
  }
`

const Blog = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const blogs = useSelector((state) => state.blog)
  // const blog = blogs.find((blog) => blog.id === id)
  const user = useSelector((state) => state.user)

  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find((b) => b.id === match.params.id) : null

  console.log(blog)

  const like = () => {
    dispatch(likeBlog(blog))
    dispatch(
      setNotification({ message: `Blog ${blog.title} liked`, type: 'info' })
    )
  }

  const remove = () => {
    dispatch(deleteBlog(blog.id))
    dispatch(
      setNotification({ message: `Blog ${blog.title} deleted`, type: 'info' })
    )
    navigate(-1)
  }

  const createComment = (e) => {
    e.preventDefault()
    dispatch(commentBlog(blog.id, e.target.comment.value))
    e.target.comment.value = ''
  }

  if (!blog) return <LoadingSpinner />

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h2>
        {blog.title} by {blog.author}{' '}
      </h2>
      <div>
        <BlogUrl href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </BlogUrl>
        <BlogLikes>
          Likes: {blog.likes} <BlogButton onClick={like}>Like</BlogButton>
        </BlogLikes>
        <div> Author: {blog.user.name ? blog.user.name : null} </div>
        {blog.user.name === user.name ? (
          <BlogRemoveButton onClick={remove}>Remove</BlogRemoveButton>
        ) : null}
        <h3 style={{ color: 'purple' }}>Comments</h3>
        <form onSubmit={createComment}>
          <input type="text" name="comment" /> {''}
          <BlogButton type="submit">add comment</BlogButton>
        </form>
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Blog
