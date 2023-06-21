import React from 'react'


const Header = (props) => {
  return (
    <>
        <h1>{props.course}</h1>
    </>
  )
}

const Content = (props) => {
  const parts = props.parts
  return (
    <>
      {parts.map(el => (
        <Part part={el.name} exercises={el.exercises} />
      ))}
    </>
  )
}

const Total = (props) => {
  const exercises = props.exercises 
  return (
    <>
        <p>Number of exercises: {exercises[0] + exercises[1] + exercises[2]}</p>
    </>
  )
}

const Part = (props) => {
  return (
    <p>{props.part} {props.exercises}</p>
  )
}


function App() {

  const course = { 
    name: 'Half Stack application development',
    parts: [ 
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ]
}

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total exercises={course.parts.map(x => x['exercises'])}/>
    </div>
  )
}

export default App
