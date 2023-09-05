import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotificationWithTimeout } from "../reducers/notificationReducer"

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

const vote = async (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotificationWithTimeout(`You voted '${anecdote.content}'`, 5))
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
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList