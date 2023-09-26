import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import styled from 'styled-components'

const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
`

const InputLabel = styled.label`
  display: block;
  font-size: 16px;
  margin-bottom: 8px;
  color: #885df1;
`

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 3px;
`

const SubmitButton = styled.button`
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

const BlogForm = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''

    const blogToCreate = {
      title: title,
      author: author,
      url: url,
    }

    dispatch(createBlog(blogToCreate, user))
    dispatch(
      setNotification({
        message: `blog ${title} by ${author} added`,
        type: 'success',
      })
    )
  }

  return (
    <FormContainer>
      <h2 style={{ fontFamily: 'roboto, sans-serif', color: '#885df1' }}>
        Add a new blog
      </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <InputLabel htmlFor="title">Title</InputLabel>
          <InputField type="text" name="title" id="title" />
        </div>
        <div>
          <InputLabel htmlFor="author">Author</InputLabel>
          <InputField type="text" name="author" id="author" />
        </div>
        <div>
          <InputLabel htmlFor="url">URL</InputLabel>
          <InputField type="text" name="url" id="url" />
        </div>
        <SubmitButton type="submit">Add</SubmitButton>
      </form>
    </FormContainer>
  )
}

export default BlogForm
