
import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const Header = (props) => {
    return (
      <h1>{props.course.name}</h1>
    )
  }

  const Total = (props) => {
    console.log(props)

    let sum = 0
    props.parts.forEach(element => {
      sum = sum + element.exercises
    });
    return (
      <p>Number of exercises {sum} </p>
    )
  }

  const Content = (props) => {
    return (
      <div>
        <Part part={props.parts[0]} />
        <Part part={props.parts[1]} />
        <Part part={props.parts[2]} />
      </div>
    )
  }

  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    )
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))