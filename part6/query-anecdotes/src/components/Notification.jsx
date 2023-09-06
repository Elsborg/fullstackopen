import { useContext } from 'react'
import NotificationContext from '../notificationContext'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  const [notification, dispatch] = useContext(NotificationContext)
  
  if (notification === null) {
    return null
  }

  if (notification) {
    setTimeout(() => {
      dispatch({ type: 'REMOVE_NOTIFY'})
    }, 5000)
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
