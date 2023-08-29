import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

const blog = {
  title: 'Testing title',
  author: 'Testing author',
  url: 'htpps://test.org',
  likes: 5,
  user: {
    username: 'username',
    name: 'user',
    id: '64ca4137fde75416193892b6'
  },
  id: '64e507f907adb284aa2e7017'
}

test('renders content', () => {
  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.content')
  expect(div).toHaveTextContent(`${blog.title} ${blog.author}`)

  const list = container.querySelector('.list')
  expect(list).toHaveStyle('display: none')
})

test('toggling shows the other blog contents', async () => {
  const { container } = render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = container.querySelector('.toggleButton')
  await user.click(button)

  const div = container.querySelector('.list')
  expect(div).not.toHaveStyle('display: none')
  expect
})

test('clicking like button two times triggers the even handler twice', async () => {
  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} addLike={mockHandler} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('Like')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('<Blog /> updates parent state and calls submit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const inputs = screen.getAllByRole('textbox')
  const sendButton = screen.getByText('Create')

  await user.type(inputs[0], 'testing a form...')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing a form...')

})
