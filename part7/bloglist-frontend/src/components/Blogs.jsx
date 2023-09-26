import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const BlogContainer = styled.div`
  border: 1px solid #ccc;
  margin: 16px;
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: roboto, sans-serif;
`

const BlogTitle = styled.h2`
  font-size: 1.5rem;
  margin: 0;
`

const BlogAuthor = styled.p`
  font-size: 1rem;
  margin: 8px 0;
  color: #555;
`

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
  padding: 8px 16px;
  margin-right: 8px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
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

const Blogs = () => {
  const blogs = useSelector((state) => state.blog)

  return (
    <div>
      {blogs.map((blog) => (
        <BlogContainer key={blog.id}>
          <BlogTitle>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} by {blog.author}
            </Link>
          </BlogTitle>
        </BlogContainer>
      ))}
    </div>
  )
}

export default Blogs
