import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => 
    [...state.anecdotes]
      .sort((a, b) => b.votes - a.votes)
      .filter(anecdote =>
        anecdote.content
        .toLowerCase()
        .includes(state.filter.toLowerCase()))
  )

  const dispatch = useDispatch()

const vote = (id) => {
    dispatch(voteAnecdote(id))
    dispatch(
        setNotification(`You voted ${anecdotes.find(a => a.id === id).content}`)
    )

    const timeout = setTimeout(() => {
        dispatch(setNotification(''))
        clearTimeout(timeout)
    }, 5000)
}
  
  return (
    <div>
      {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList