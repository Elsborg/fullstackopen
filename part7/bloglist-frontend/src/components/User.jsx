import { useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import styled from 'styled-components'
import LoadingSpinner from './LoadingSpinner'

const Container = styled.div`
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  margin: 0;
  text-align: left;
`

const UserName = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`

const BlogList = styled.ul`
  list-style: none;
  padding: 0;
`

const BlogItem = styled.li`
  font-size: 18px;
  margin-bottom: 5px;
  padding-left: 20px;
  position: relative;

  &:before {
    content: '•';
    position: absolute;
    left: 0;
    color: purple;
  }
`

const User = () => {
  const match = useMatch('/users/:id')
  const users = useSelector((state) => state.users)
  const user = match ? users.find((user) => user.id === match.params.id) : null

  if (!user) return <LoadingSpinner />

  return (
    <Container>
      <UserName>{user.name}</UserName>
      <h3 style={{ textTransform: 'capitalize' }}>added blogs:</h3>
      <BlogList>
        {user.blogs &&
          user.blogs.map((blog) => (
            <BlogItem key={blog.id}>{blog.title}</BlogItem>
          ))}
      </BlogList>
    </Container>
  )
}

export default User
