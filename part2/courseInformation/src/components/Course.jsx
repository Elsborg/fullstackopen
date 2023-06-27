import React from 'react'
import Header from './Header'
import Content from './Content'

const Course = ({ course }) => {

    const total = course.parts.reduce((a, b) => a + b.exercises, 0)

  return (
    <>
        <Header name={course.name} />
        <Content course={course.parts} />
        <p><b>Total of {total} exercises</b></p>

    </>
  )
}

export default Course
