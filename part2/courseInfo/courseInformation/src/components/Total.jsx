import React from 'react'

const Total = ({ exercises }) => {
    return (
      <div>
          <p><b>Total of exercises: {exercises[0] + exercises[1] + exercises[2]}</b></p>
      </div>
    )
  }

export default Total
