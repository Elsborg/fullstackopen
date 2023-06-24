import { useState } from 'react'

const Button = ({ text, handleClick}) => <button onClick={handleClick}>{text}</button>
const Title = ({text}) => <h1>{text}</h1>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const handleVote = () => {
    const newPoints = [...points]
    newPoints[selected] +=1
    setPoints(newPoints)
  }

  const mostVotes = Math.max(...points)
  const mostVotesAnecdote = anecdotes[points.indexOf(mostVotes)]
  console.log('votes', mostVotesAnecdote)

  return (
    <div>
      <Title text={'Anecdote of the day'} />
      {anecdotes[selected]}
      <p>has {points[selected]} votes</p>
      <div>
        <Button text={'vote'} handleClick={handleVote} />
        <Button text={'next anecdote'} handleClick={ () => setSelected(Math.floor((Math.random() * anecdotes.length))) } />
      </div>
        <Title text={'Anecdote with most votes'} />
        {mostVotesAnecdote}
        <p>has {mostVotes} votes</p>
    </div>
  )
}

export default App