import React from 'react'
import Course from './components/Course'

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application Development',
    parts:[
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,    
        id: 2,
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3,
      },
      {
        name: 'Redux',
        exercises: 13,
        id: 4,
      },
      {
        name: 'TypeScript',
        exercises: 50,
        id: 5,
      }
    ]
  }
  return (
    <>
    <Course course = {course} />
    
    </>
  )
}

export default App
