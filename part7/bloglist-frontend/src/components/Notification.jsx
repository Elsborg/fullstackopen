import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { hideNotification } from '../reducers/notificationReducer'
import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`
const getBackgroundColor = (type) => {
  switch (type) {
    case 'success':
      return '#4CAF50'
    case 'warning':
      return '#FFC107'
    case 'danger':
      return '#F44336'
    case 'info':
      return '#2196F3'
    default:
      return '#4CAF50'
  }
}

const NotificationContainer = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  background-color: ${(props) => getBackgroundColor(props.type)};
  color: white;
  padding: 15px 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.3s ease-in-out;
  width: 600px;
  z-index: 999;
`

const Notification = () => {
  const dispatch = useDispatch()
  const { message, type } = useSelector((state) => state.notification)

  useEffect(() => {
    let timer
    if (message) {
      timer = setTimeout(() => {
        dispatch(hideNotification())
      }, 3000)
    }

    return () => clearTimeout(timer)
  }, [message, dispatch])

  if (!message) {
    return null
  }

  return <NotificationContainer type={type}>{message}</NotificationContainer>
}

export default Notification
