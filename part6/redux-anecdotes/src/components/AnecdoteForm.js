import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  
  const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        dispatch(createAnecdote(content))
        dispatch(setNotification(`Added ${event.target.anecdote.value}`))
  
        const timeout = setTimeout(() => {
          dispatch(setNotification(''))
          clearTimeout(timeout)
        }, 5000)
        event.target.anecdote.value = ''
   }

  return (
    <form onSubmit={addAnecdote}>
      <div><input name='anecdote' /></div>
      <button type='submit'>create</button>
    </form>
  )
}

export default AnecdoteForm