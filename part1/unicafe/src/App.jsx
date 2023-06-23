import { useState } from 'react'
import Button from './components/Button'
import Header from './components/Header'
import Statistics from './components/Statistics'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = (all ? (good * 100) / all : 0) + "%"

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    
  }

  const handleBad = () => {
    setBad(bad + 1)
    
  }

  return (
    <div>
      <Header header={'give feedback'} />
      <Button handleClick={handleGood} text={'good'} />
      <Button handleClick={handleNeutral} text={'neutral'} />
      <Button handleClick={handleBad} text={'bad'} />
      <Header header={'statistics'} />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />

    </div>
  )
}

export default App