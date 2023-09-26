import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'
import { login } from '../reducers/loginReducer'
import styled from 'styled-components'

const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 0 auto;
`

const FormTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`

const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box; /* Add this line */
`

const FormButton = styled.button`
  width: 100%;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-sizing: border-box; /* Add this line */

  &:hover {
    background-color: #0056b3;
  }
`

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    event.target.username.value = ''
    event.target.password.value = ''
    dispatch(login(username, password))
    dispatch(initializeBlogs())
  }

  return (
    <LoginFormContainer>
      <FormTitle>Login</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="username"
          id="username"
          placeholder="username"
          required
        />
        <FormInput
          type="password"
          name="password"
          id="password"
          placeholder="password"
          required
        />{' '}
        <br />
        <FormButton type="submit">Login</FormButton>
      </form>
    </LoginFormContainer>
  )
}

export default LoginForm
