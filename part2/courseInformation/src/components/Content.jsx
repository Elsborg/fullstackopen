import React from 'react'
import Part from './Part'

const Content = ({ course }) => {
    return (
      <>
        {course.map(({name, exercises, id}) => (
            <Part key={id} part={name} exercises={exercises} />
        ))}
      </>
    )
  }

export default Content
